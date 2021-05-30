//jshint esversion:6

const mongoose = require("mongoose");

const postSchema = {
  title: String,
  content: String
};
const Post = mongoose.model("Post", postSchema);
const post1 = new Post({
  title: "那天我們去高鐵左營 Default Post 1",
  content: "高鐵左營站是 Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? Content of default post 1"
});

const post2 = new Post({
  title: "賞花賞月賞秋香 Default Post 2",
  content: "秋香開始跳繩 Section 1.10.33 of de Finibus Bonorum et Malorum, written by Cicero in 45 BC At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat."
});

const post3 = new Post({
  title: "我愛吉他 Default Post 3",
  content: "大家認識小明星王俊凱嗎？哈哈，不用問，肯定都認識了。而我和他的愛好一樣都喜歡彈吉他。吉他有六根弦，十來個品位，中間還有琴板組成的擴音器……每彈起吉他我的心就感覺像着了魔似的，非常激動，甚至讓我感到有點自戀。我經常沉醉在自彈自唱中，爸爸媽媽也聽得津津有味。而且我學吉他很認真，從不馬虎。有一次培訓班老師對我說：二龍（我的外號，老師取的，我也不知道他爲什麼這樣叫我），你用撥片把《童年》掃一遍。我毫不猶豫地拿起撥片“唰唰唰”地掃了起來。頓時那些煩惱全掃光了。老師給我一個大大的贊。吉他還可以用來滅髒話”呢！那一次，我學琴的地方有兩名同學吵了起來，互相對罵着，很難聽。旁邊還有別的同學起鬨：罵得好，罵得妙，罵得兩位呱呱叫。我立馬拿起電吉他（比普通吉他音律要高10倍）彈了起來，那聲音如同山崩地裂，那些同學馬上被嚇得望風而逃，再也不敢說髒話了。吉他還有說也說不盡的樂趣，不信你們就親自來試試吧！"});


const userSchema = {
  userName: String,
  email: String,
  posts: []
};
const User = mongoose.model("User", userSchema);
const user1 = new User({
  userName: "Pochin",
  email: "sunpochin@gmail.com",
  posts: [post1, post2, post3]
});
const user2 = new User({
  userName: "Aaron",
  email: "aaron@b.com",
  posts: [post3, post1, post2]
});
const user3 = new User({
  userName: "jack",
  email: "jack@b.com",
  posts: [post2, post3, post1]
});

module.exports = {Post, User};
