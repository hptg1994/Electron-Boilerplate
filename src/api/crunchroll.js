// npm packages
import axios from 'axios';
import cheerio from 'cheerio';
import electron from "electron";
import path from "path";
import { spawn } from "child_process";
import fs from "fs" 

// our packages
import db from '../db';
// base URL used for most requests
const baseURL = 'http://www.crunchyroll.com';

// folder for the video
const userDataPath = (electron.app || electron.remote.app).getPath("userData")
const targetFolder = path.join(userDataPath,"crunchyroll");
try {
  fs.accessSync(targetFolder);
} catch (error) {
  fs.mkdirSync(targetFolder)
}
// main module
export const Crunchyroll = {
  async getAllSeries(page = 0) {
    // load catalogue
    const { data } = await axios.get(
      `${baseURL}/videos/anime/popular/ajax_page?pg=${page}`
    );
    // create cheerio cursor
    const $ = cheerio.load(data);

    const series = $('li.group-item')
      .map((index, el) => {
        const element = $(el);
        // get title & url
        const a = $('a', element);
        const title = a.attr('title');
        const _id = a.attr('href');
        const url = `${baseURL}${_id}`;
        // get image
        const img = $('img', element);
        const image = img.attr('src');
        // get videos count
        const seriesData = $('.series-data', element);
        const count = parseInt(
          seriesData.text().trim().replace('Videos', '').trim(),
          10
        );
        // return series data
        return {
          _id,
          source: 'crunchyroll',
          title,
          url,
          image,
          count,
        };
      })
      .get();
    // store in the db
    await db.series.bulkDocs(series);
    return series;
  },

  async getEpisodes(series) {
    // load episodes    
    const { data } = await axios.get(series.url);
    // create cheerio cursor
    const $ = cheerio.load(data);
    const episodesContainer = $('.list-of-seasons ul.portrait-grid');
    const episode = $(".group-item", episodesContainer)
      .map((index, el) => {
        const element = $(el);
        const _id = $('a.episode', element).attr("href");
        const url = `${baseURL}${_id}`;
        const img = $("img", element)
        const image = img.attr("src") || img.attr('data-thumbnailurl')
        const title = $(".series-title", element).text().trim();
        const description = $(".short-desc", element).text().trim()
        return {
          _id,
          url,
          image,
          title,
          description
        };
      }).get();

    // store in the db;
    await db.episodes.bulkDocs(episode);
    return episode;
  },
  getEpisode(episode) {
    const dl = spawn("youtube-dl",[episode.url],{cwd:targetFolder});
    dl.stdout.on("data",(data) => {
      
    })

    dl.stderr.on("data",(date) => {

    })
  },
  getMySeries() {

  },
  search(query) {

  },
};