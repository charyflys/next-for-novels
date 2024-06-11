'use client'
import { resBody } from "@/lib/quickapi";
import request from "@/request";
import { Button } from "@mui/material";
// import { compress, decompress } from "lzma";
import lzma from 'lzma/src/lzma_worker'
const compress = lzma.LZMA.compress
const decompress = lzma.LZMA.decompress

function PostForm() {
    return request(
        'post',
        '/test/formdata',
        {
            name: 'test',
            age: 20,
            file: new File(['hello world'], 'hello.txt', { type: 'text/plain' })
        },
        'formdata'
    )
}
function UploadFile() {
  return request(
      'post',
      '/api/test/uploadfile',
      {
          name: 'test',
          age: 20,
          file: new File(['hello world'], 'hello.txt', { type: 'text/plain' })
      },
      'formdata'
  )
}
async function getArticle(articlepath: string) {
  return await fetch('/api/test/uploadfile'+`?name=${articlepath}`)
  .then(res=>res.arrayBuffer())
  .then(arrbuf=> {
      const uint8arr = new Uint8Array(arrbuf)
      decompress(uint8arr,(result,error) => {
          console.log(result,error)
      })
  })
}

async function addArticle(data: ArticleContent) {
  return new Promise((resolve,reject) => {
      compress(data.content,8,(result,error) => {
          if (error)reject({ code:'500', msg: 'compress failed' })
          const {
              name,
              index,
              exist,
          } = data
          const uint8arr = new Uint8Array(result as Array<number>)
          const str = new TextDecoder().decode(uint8arr)
          const blob = new Blob([uint8arr])
          console.log(blob,result,str)
          // const blob2 = new Blob([new TextDecoder().decode(result)])
          resolve(request<resBody>(
              'post',
              '/test/uploadfile',
              {
                  name,
                  index,

                  exist,
                  content: blob
              },
              'formdata'
          ))
      })
  })
}

function handleClick() {
  console.log('clicked');
  PostForm();
}
function handleClick1() {
  console.log('clicked');
  UploadFile();
}
function clickAddArticle() {
  addArticle({
    novelId: '2389094309',
    chapterIndex: 3,
    index: 0,
    name: '测试章节',
    exist: true,
    content: `杰特等人离开治疗院，来到大马路上。根据治愈师的说法，葛伦没有什么大问题，需要担心的，只有因为重创初愈而衰弱的体力。由于身体内外都没有检查出异常，就连治愈师们也不明白他剧痛的原因，只能让葛伦先睡去。「……到底发生了什么事……？」杰特走在夕阳下的马路上，回想着治疗院的事，闷闷地思考着。连治愈师也查不出原因的头痛、能弹开超域技能的强大力量，以及葛伦昏迷前说的话——毫无预警地在眼前发生的一切，愈想愈无法以常理说明。「……应该是封口吧。」劳如此低声道。「黑社会的老家伙们偶尔会使用禁术。是直接施展在脑上，在符合条件时使人产生记忆障碍的的禁术魔法——可是能把露露莉的技能弹开，代表那不是魔法呢。」「……神域技能。」杰特把手指抵在下巴，接着道：「如果葛伦刚才异常的原因，是被『那位大人』封口的话……表示那家伙也有神域技能……」「而且知道『那位大人』的真正身分，会让我们有不好的回忆。不就等于我们认识那个人吗？」两人的对话，使垂着肩膀的露露莉悲伤地道：「……我们……又被什么人操弄了吗……」「……」尽管马路上热闹喧嚣，白银一行人周围的空气却很沉重。到头来，他们不但没能从葛伦那里问出任何「那位大人」的事，而且还明白了整件事背后有更巨大的黑幕。只留下彷佛被人玩弄在股掌上似的烦闷感。亚莉纳叹了口气，吹散压在白银身上的沉重气氛。「虽然事情的发展有点令人惊讶，但既然葛伦没事，不就好了？」杰特等人一齐惊醒地抬头，就连原本脸上罩着阴霾的露露莉，也想起了重要的事般连连点头。「说……说的也是！好不容易才从魔神那里抢回身体，如果因为这件事死掉，就太令人悲——」「葛伦还得帮我解决加班问题。他死掉的话，我会很困扰。」「……」亚莉纳直白地说出理由，使露露莉的脸颊抽搐不已，一旁的劳也大大叹了口气，放松身体，仰望火红的天空。「亚莉纳妹妹说的对。现在想再多也没用。总之想利用魔神的，不只黑衣男而已。唉——为什么每个家伙都只想着干危险的事啊——」「又不是每个人都像劳一样没心没肺的。」「原来露露莉觉得我没心没肺的吗？」「……说的也是，现有的情报太少了，就算想再多也没用。」杰特说着，瞥了亚莉纳一眼。就像黑衣男——葛伦想利用亚莉纳的力量，「那位大人」说不定也有相同的打算。大陆上可能还有许多魔神沉眠，不知道下次那些人会以什么样的手法搞事。不好的预感掠过心头，使杰特微微皱眉。（得快点变强才行……）为了不让亚莉纳的脸上出现不安。为了让她能真正过上理想中的平稳生活——「干嘛？」忽然发现杰特的视线，亚莉纳的表情一下子凶狠起来。「没有——」见到她那过于诚实的表情，杰特觉得有点安心。面对杰特时，亚莉纳总是毫不遮掩地展现自己的感情。见过研习时「温文有礼的亚莉纳」后，能像这样被她以真正的感情对待，也许是一种光荣吧。「——没事。是说今天有多少累积的文件要处理？」「不只今天的份，是累积好几天的文件。你看到会吓死哦。」「……似乎得做到凌晨了呢。」「还不都是因为发现了超大型迷宫……！是说既然你们既然这么有精神，就快点去攻略迷宫啊……！」「有、有啦，攻略有在进行哦。但毕竟是超过七层的大型迷宫，准备起来需要一点时间……」杰特连忙对变得像恶鬼一样的亚莉纳做解释，他身后的露露莉与劳尴尬地眼神乱飘。????亚莉纳向之后要前往公会总部的露露莉与劳道别，为了处理堆积如山的未处理事务，与杰特一起前往伊富尔服务处。本来只想溜出来一下，没想到会拖这么久。原本火红的天空已经开始转暗了。只要想到等一下要加班，因下班人潮而熙熙攘攘的伊富尔街头，看起来就十分可恨。「唉——……研习一结束，就因为超大型迷宫而天天加班，而且结果也没抢到生日假……」亚莉纳走在路上，想起生日假的事，嘟哝起来。以生日假作为报酬，征求业务改善方案。结果，原本想向传说中的柜台小姐罗赛塔·露柏利讨教的亚莉纳，被狂热工作狂吓到产生心灵创伤后，只能临阵磨枪地写出业务改善方案交出去。可是处长选中的，是伊富尔服务处最年长的柜台小姐提出的方案。「我也提出了好几个方案，那些都不行吗？」身为加班重要助手的杰特，在一旁歪着头发问。「全都不行……你提出的方案啊，全是没有接触过实务的人会想到的超完美理论，说的比唱的好听，现实中是做不到的哦……」「呜！」被戳中痛处，杰特无法呼吸。「确……确实是这样没错……虽然我会帮忙处理事务作业，可是没有体验过白天的现场情况呢。」就算这个男人再机灵，还是比不过有多年现场工作经验，又深知上司喜好的资深柜台小姐。「是说亚莉纳小姐的方案，『在服务处增设入场限制』、『增加精英冒险者的人数，迅速攻略迷宫』之类的，这些在现实中不但做不到，还杀气腾腾的呢。」「少、少啰唆，这是事实吧！？」亚莉纳不高兴地反驳，不过她也知道杰特想说什么。到头来，公会总部征求的业务改善方案，就是「不需要花费公会的金钱与时间，个人程度内就能立刻做到，多少有点效果」的方案。「然后前辈被采用的方案，完全迎合了处长的喜好，可以说是完美……」「什么样的方案？」「说白了，就是不要自己一个人处理所有工作，忙不过来时要大声说出来，请有空的人帮忙——这种典型的温馨互助方案哦。」「……」杰特想说什么似地张开嘴，最后又什么也没说地闭上了嘴。亚莉纳懂他想讲什么。那种不到三天就没人要做的方案就行了吗？说起来，加班时间遽增的繁忙时期，根本不存在「有空的人」，所以那其实也是不切实际的方案。前辈柜台小姐是明知这一切，可是为了抢夺生日假，才故意提出那种无济于事的方案的吧。亚莉纳之所以失败，是因为没有充分做好迎合上司喜好的觉悟。「……总之，打起精神来吧，亚莉纳小姐。」杰特说着无法作为安慰的话，忽然想起一件事似地，从腰包拿出某个物品。「对了，我有东西想给你。虽然没办法送你生日假——不过，请你收下这个。」杰特说着，把一条串有淡绿色小型结晶的细小项炼交给亚莉纳。「……这是『引导结晶片』？」见到令人怀念的物品，亚莉纳双目圆睁。引导结晶片。利用遗物制作的《白银之剑》专用特殊结晶片。结晶总共有四片，假如任何一片的持有者濒死，其他结晶片就会发出光芒，引导其他同伴前往濒死的人那里。对经常以公会精英的身分，挑战高难度迷宫的《白银之剑》来说，是必要道具。亚莉纳不久之前也戴过这个结晶片，但因为是白银专用道具，被其他人看到，身分会立刻曝光，所以攻略完迷宫，就立刻还回去了。「所以说我不打算加入白银——」亚莉纳说到一半，忽然发现杰特给他的项炼上的结晶片，与之前见过的引导结晶片不太一样。之前的结晶片应该更大一点，而且有银制的镶座，刻着白银的徽章。但是这块结晶片别说徽章了，也没有银制镶座，只是结晶的碎片。「虽然是引导结晶片，但是因为有些损坏，所以是不会发光的引导结晶片。」「什么啊，这不就没有意义了吗？」「就是因为没有意义才好啊。同伴濒死时才会发光的引导结晶片，不发光不是最好的吗？」「……的确。」「听说不会发光的引导结晶片，有『谁都不会死』的祈愿效果。」杰特的说明，让亚莉纳眉尾一跳。「……谁都不会死、吗…」用来通知同伴濒死的道具不会发亮，等于没有人会死。虽然是单纯的祈愿——但假如真的有带在身上，大家就不会死的道具，还真想要呢。亚莉纳模糊地想着。「而且漂亮得像宝石对吧？我特地请人做成项炼的。」亚莉纳凝视着手上的结晶片。虽然是失败品，但吸收了夕`
  })
}
function clickGetArticle() {
  getArticle('/test/article.txt')
}
export default function Page() {
  console.log(decompress,compress,lzma)
  return <div>
    <Button onClick={handleClick}>formdata</Button>
    <Button onClick={handleClick1}>uploadfile</Button>
    <Button onClick={clickAddArticle}>add</Button>
    <Button onClick={clickGetArticle}>get</Button>
    </div>;
}