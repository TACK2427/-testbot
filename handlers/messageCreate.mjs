
export default async (message) => {
  if (message.content.match(/めぷ/)) {
    await message.react("<:mepu:1275708338188976178>");
  }
  if (message.content.match(/すぐる/)) {
    await message.react("😓");
  }
  if (message.content.match(/楓葉/)) {
    await message.react("<:kaede:1275714444210601995>");
  }
  if (message.content.match(/test/)) {
    await message.react(
      "<:mepu:1275708338188976178><:kaede:1275714444210601995>😊"
    );
  }
  if (
    message.content.match(
      /楓葉|めぷ|すぐる|<@1102482262345404446>|<!@1102482262345404446>|妹紅|もこたん|輝夜/
    )
  ) {
    await message.reply("# かわいい");
  }

  if (message.content.match(/(お金|おかね)(欲しい|ほしい)/)) {
    await message.reply("5000兆円\n       ほしい！！");
  }

  if (
    message.content.match(
      /るみゃ|るーみあ|ルーミア|(R|r)umia(S7K|s7K|S7k|s7k)|s7k|S7K|<@1101732510578245674>|<@!1101732510578245674>|s7k|S7K|rumia/
    )
  ) {
    await message.reply("かわちい");
  }

  if (message.content.match(/かそかそかそ/)) {
    await message.reply("かそかそかそかそかーそそそ");
  }

  if (message.content.match(/<@1271101266680086591>/)) {
    await message.reply(
      "TACK2427の間違えじゃない?\nとりあえず呼ぶね\n<@1040868784682061897>"
    );
  }

  if (message.content.match(/るみゃめぷ/)) {
    await message.reply("# るみゃめぷてぇてぇ");
  }

  if (message.content.match(/おはよう|おはよ|おは/)) {
    await message.reply("おはよ");
  }
  if (message.content.match(/帰宅|ただいま/)) {
    await message.reply("おかえり");
  }
  if (message.content.match(/(がこ|学校)(おわ|終わった)/)) {
    await message.reply("お疲れ様");
  }
  if (message.content.match(/今北産業/)) {
    await message.reply("え、、めんど");
  }

  if (message.content.match(/test/)) {
    await message.reply("testで返信するぞい");
  }

  if (message.content.match(/Steam_icon/)) {
    await message.reply("<:Steam_icon_logo:1275387033845497878>");
  }

  if (message.content.match(/おやすみ/)) {
    await message.reply("おやすみなのだー");
  }

  if (message.content.match(/こんれじ/)) {
    await message.reply("こんれじなのだー");
  }

  if (message.content.match(/おつれじ/)) {
    await message.reply("おつれじなのだー");
  }
  if (message.content.match(/edge|Edge/)) {
    await message.reply("すまん俺Chrome派");
  }
  if (message.content.match(/暇|ひま/)) {
    await message.reply("暇なのは一緒だね");
  }
  if (message.content.match(/(午前|ごぜん)に午後の紅茶飲みました/)) {
    await message.reply("暇なのは一緒だね");
  }
  if (message.content.match(/日本/)) {
    await message.reply("大日本帝国な？(圧)");
  }
  if (
    message.content.match(/午前に午後の紅茶(を)?(飲んだ|のんだ|飲みました)/)
  ) {
    await message.reply("なぜ午前に飲んでるの！？¥n怒るよ");
  }
  if (
    message.content.match(
      /ふらんれみりあゆくおやすみおはようedgeゆっくりしていってねrumia帰宅がこおわしごおわ仕事おわバイトおわ学校おわ眠いにゃにゃーんねこさんソ連ﾋﾟﾎﾟ午後ティー午前に飲んだぽてとs24uzf61d100nk!カオスお風呂の温度はお外の温度は分身ちゃんのパク鎌と槌/
    )
  ) {
    await message.reply("私にその呪文は効かぬ");
  }


  // ==========================
  // ① 特定の言葉 + 確率で返信する (例: "こんにちは")
  // ==========================
  if (message.content.match(/こんにちは/)) {
    if (Math.random() < 0.5) { // 50%の確率
      await message.reply("やっほー！");
    }
    // 外れた場合は返信しない
  }

  // ==========================
  // ② 特定の言葉 + 確率でメッセージが変わる (例: "ガチャ")
  // ==========================
  if (message.content.match(/ガチャ/)) {
    const rand = Math.random();

    if (rand < 0.1) {        // 10%
      await message.reply("SSR大当たり！！✨");
    } else if (rand < 0.4) { // 30%
      await message.reply("SR まぁまぁ！");
    } else {                 // 60%
      await message.reply("R ハズレ…");
    }
  }

  // ==========================
  // ③ 特定の言葉 + 完全ランダムで返信 (例: "ランダム")
  // ==========================
  if (message.content.match(/ランダム/)) {
    const responses = [
      "にゃーん",
      "わん！",
      "あほ",
      "おはよう！",
      "おやすみー",
      "今日もいい天気だね！"
    ];

    const choice = responses[Math.floor(Math.random() * responses.length)];
    await message.reply(choice);
  }
};



  
};
