// 引用 line 機器人套件
import linebot from 'linebot'
// 引用 dotenv 套件
import dotenv from 'dotenv'
// 引用 axios 套件
import axios from 'axios'
// 引用 node-schedule
import schedule from 'node-schedule'

let contents = []
let i =0;

const updateData = async () => {
      const response = await axios.get('https://api.kento520.tw/zack/')

      contents = response.data
  
}



schedule.scheduleJob('* * 0 * * *', () => {
  updateData()
})
updateData()

// 讀取 .env
dotenv.config()

// 設定機器人
const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
})

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

bot.on('message', async event => {
  try {
    let reply
    const text = event.message.text

    if(text) {
      reply = contents[getRandomInt(885)].description
    }
    event.reply(reply);

    
    
  } catch (error) {
    event.reply('發生錯誤')
  }
})

bot.listen('/', process.env.PORT, () => {
  console.log('機器人已啟動')
})
