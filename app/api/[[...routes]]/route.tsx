/** @jsxImportSource frog/jsx */

import { Button, Frog, TextInput } from 'frog'
import { devtools } from 'frog/dev'
// import { neynar } from 'frog/hubs'
import { handle } from 'frog/next'
import { serveStatic } from 'frog/serve-static'
import axios from 'axios'

const rootCastHash = "0x867eaa7c09b7d5908e5a0b54676f93516859527f"

const app = new Frog({
  assetsPath: '/',
  basePath: '/api',
  // Supply a Hub to enable frame verification.
  // hub: neynar({ apiKey: 'NEYNAR_FROG_FM' })
  imageOptions: {
    /* Other default options */
    fonts: [
      {
        name: 'Righteous',
        source: 'google',
      },
    ],
  },
})

// Uncomment to use Edge Runtime
// export const runtime = 'edge'

// for installing the cast action
app.frame('/install-save-this-reply', (c) => {
  return c.res({
    image: (
      <div style={{ color: 'white', display: 'flex', fontSize: 60 }}>
        Add "save this reply" Action
      </div>
    ),
    intents: [
      <Button.AddCastAction action="/save-this-reply-action">
        Add
      </Button.AddCastAction>,
    ]
  })
})

// cast action trigger that displays the frame
app.castAction(
  '/save-this-reply-action',
  (c) => {
    const { actionData } = c
    const { castId, fid, messageHash, network, timestamp, url } = actionData
    console.log(
      `Cast Action to ${JSON.stringify(c.actionData.castId)} from ${
        c.actionData.fid
      }`,
    )
    // TODO - GET THE CAST HASH FROM THE ROOT CAST ASSOCIATED WITH THIS MESSAGE HASH
    const rootCastHash = "0xgoodReplyHashhhhhh"
    return c.res({ type: 'frame', path: `/save-this-reply-frame/${rootCastHash}/${messageHash}` })
  },
  { name: "save this reply", icon: "log" }
)

// initial frame image, which already knows the hash of the (good) reply that is being saved and the root cast hash
app.frame('/save-this-reply-frame/:rootCastHash/:goodReplyHash', (c) => {
  const { rootCastHash, goodReplyHash } = c.req.param()
  return c.res({
    action: `/store-on-database/${rootCastHash}/${goodReplyHash}`,
    image: (
      <div
            style={{
                  alignItems: 'center',
                  background:'linear-gradient(to right, #432889, #17101F)',
                  backgroundSize: '100% 100%',
                  display: 'flex',
                  flexDirection: 'column',
                  flexWrap: 'nowrap',
                  height: '100%',
                  justifyContent: 'center',
                  textAlign: 'center',
                  width: '100%',
                }}>
                <div
        style={{
          color: 'white',
          fontSize: 50,
          fontStyle: 'normal',
          letterSpacing: '-0.025em',
          lineHeight: 1,
          display: "flex",
          marginTop: 30,
          padding: '0 120px',
          whiteSpace: 'pre-wrap',
        }}
      >
             you are calling this cast action on a good reply. please enter the warpcast url of the bad reply to store these three on the database.
      </div>
      </div>
    ),
    intents: [
      <TextInput placeholder="https://www.warpcast.com/anky/0x..." />,
      <Button value="reply">add bad reply url</Button>,
    ],
  })
})

app.frame('/store-on-database/:rootCastHash/:goodReplyHash', (c) => {
  const { rootCastHash, goodReplyHash } = c.req.param()
  const badReplyLink = c.inputText;
  // fetch the bad reply link to neynar and store the data associated with it on the database
  const prismaReplyId = "asdaioudsa"
  return c.res({
    action: `/save-comment/${prismaReplyId}`,
    image: (
      <div
            style={{
                  alignItems: 'center',
                  background:'linear-gradient(to right, #432889, #17101F)',
                  backgroundSize: '100% 100%',
                  display: 'flex',
                  flexDirection: 'column',
                  flexWrap: 'nowrap',
                  height: '100%',
                  justifyContent: 'center',
                  textAlign: 'center',
                  width: '100%',
                }}>
                <div
        style={{
          color: 'white',
          fontSize: 50,
          fontStyle: 'normal',
          letterSpacing: '-0.025em',
          lineHeight: 1,
          display: "flex",
          marginTop: 30,
          padding: '0 120px',
          whiteSpace: 'pre-wrap',
        }}
      >
             are there any comments that you want to save associated with this?
      </div>
      </div>
    ),
    intents: [
      <TextInput placeholder="add comment..." />,
      <Button value="add-comment">save</Button>,
    ],
  })
})

app.frame('/save-comment/:prismaId', (c) => {
  const { prismaId } = c.req.param()
  const { inputText } = c
  if (inputText && inputText?.length > 2) {
  // fetch the database and add the corresponding comment 
    return c.res({
      image: (
        <div
              style={{
                    alignItems: 'center',
                    background:'linear-gradient(to right, #432889, #17101F)',
                    backgroundSize: '100% 100%',
                    display: 'flex',
                    flexDirection: 'column',
                    flexWrap: 'nowrap',
                    height: '100%',
                    justifyContent: 'center',
                    textAlign: 'center',
                    width: '100%',
                  }}>
                  <div
          style={{
            color: 'white',
            fontSize: 50,
            fontStyle: 'normal',
            letterSpacing: '-0.025em',
            lineHeight: 1,
            display: "flex",
            marginTop: 30,
            padding: '0 120px',
            whiteSpace: 'pre-wrap',
          }}
        >
              your comment and everything was saved. keep it going. we need more data to train @anky
        </div>
        </div>
      ),
    })
  } else {
    return c.res({
      image: (
        <div
              style={{
                    alignItems: 'center',
                    background:'linear-gradient(to right, #432889, #17101F)',
                    backgroundSize: '100% 100%',
                    display: 'flex',
                    flexDirection: 'column',
                    flexWrap: 'nowrap',
                    height: '100%',
                    justifyContent: 'center',
                    textAlign: 'center',
                    width: '100%',
                  }}>
                  <div
          style={{
            color: 'white',
            fontSize: 50,
            fontStyle: 'normal',
            letterSpacing: '-0.025em',
            lineHeight: 1,
            display: "flex",
            marginTop: 30,
            padding: '0 120px',
            whiteSpace: 'pre-wrap',
          }}
        >
               the cast triada was saved without comments. keep it going. we need more data to train @anky
        </div>
        </div>
      ),
    })
  }
  
})




app.frame('/', (c) => {
  return c.res({
    action: "/step-one",
    image: (
      <div
            style={{
                  alignItems: 'center',
                  background:'linear-gradient(to right, #432889, #17101F)',
                  backgroundSize: '100% 100%',
                  display: 'flex',
                  flexDirection: 'column',
                  flexWrap: 'nowrap',
                  height: '100%',
                  justifyContent: 'center',
                  textAlign: 'center',
                  width: '100%',
                }}>
                <div
        style={{
          color: 'white',
          fontSize: 50,
          fontStyle: 'normal',
          letterSpacing: '-0.025em',
          lineHeight: 1,
          display: "flex",
          marginTop: 30,
          padding: '0 120px',
          whiteSpace: 'pre-wrap',
        }}
      >
             you are calling this cast action on a good reply.
      </div>
      </div>
    ),
    intents: [
      <TextInput placeholder="jerry garcia, steve jobs, etc." />,
      <Button value="reply">reply</Button>,
    ],
  })
})

// STEP 2 - CHECK IF ALREADY REPLIED
app.frame('/step-one', async (c) => { 
  const { buttonValue, frameData } = c
  let fid, userInput
  if(frameData){
    fid = frameData.fid
    userInput = frameData?.inputText || ""
  }
  if(false) {
    return c.res({
      image: (
        <div
              style={{
                    alignItems: 'center',
                    background:'linear-gradient(to right, #432889, #17101F)',
                    backgroundSize: '100% 100%',
                    display: 'flex',
                    flexDirection: 'column',
                    flexWrap: 'nowrap',
                    height: '100%',
                    justifyContent: 'center',
                    textAlign: 'center',
                    width: '100%',
                  }}>
                  <div
          style={{
            color: 'white',
            fontSize: 50,
            fontStyle: 'normal',
            letterSpacing: '-0.025em',
            lineHeight: 1,
            display: "flex",
            marginTop: 30,
            padding: '0 120px',
            whiteSpace: 'pre-wrap',
          }}
        >
               aloja
        </div>

        </div>
      ),
      intents: [
        <Button.Link href="https://warpcast.com/~/compose?text=choose%20the%20most%20legendary%20human%20of%20our%20time%20on%20the%20frame%20below%20%F0%9F%91%87%F0%9F%8F%BD%20%28credits%3A%20%40jpfraneto%29&embeds[]=https://bangercaster.xyz/api
        ">share frame</Button.Link>,
      ],
    })
  } else {
    if(!frameData?.inputText || frameData?.inputText.length < 8 ){
      return c.res({
        image: (

          <div
          style={{
                alignItems: 'center',
                background:'linear-gradient(to right, #432889, #17101F)',
                backgroundSize: '100% 100%',
                display: 'flex',
                flexDirection: 'column',
                flexWrap: 'nowrap',
                height: '100%',
                justifyContent: 'center',
                textAlign: 'center',
                width: '100%',
              }}>
              <div
                  style={{
                    color: 'white',
                    fontSize: 50,
                    fontStyle: 'normal',
                    letterSpacing: '-0.025em',
                    lineHeight: 1,
                    display: "flex",
                    marginTop: 30,
                    padding: '0 120px',
                    whiteSpace: 'pre-wrap',
                  }}
                >
                        enter a valid name
                </div>
       </div>
        ),
        intents: [
          <TextInput placeholder="ricky martin, cristiano ronaldo, etc." />,
          <Button value="reply">try again</Button>,
        ],
      })
    }
    let poiesisResponse = await axios.post('https://poiesis.anky.bot/legendary', {userInput} ,{
      headers: {
        'Authorization': `Bearer ${process.env.POIESIS_API_KEY}`
      }
    });
    if(poiesisResponse?.data?.isLegendary){
      const dataToSave = {
        chosenHuman: userInput,
        isLegendary: poiesisResponse?.data.isLegendary,
        legendaryness: poiesisResponse?.data.legendaryness,
        replyToUser: poiesisResponse?.data.replyToUser,
        fid: fid
      }
      try {
        const usernameResponse = await axios.get(
          `https://api.neynar.com/v2/farcaster/user/bulk?fids=${fid}&viewer_fid=16098`,
          {
            headers: {
              api_key: process.env.NEYNAR_API_KEY,
            },
          }
        );
        let castText = `@${usernameResponse.data.users[0].username} - ${userInput}\n\n${dataToSave.replyToUser}`
        let castOptions = {
          text: castText,
          signer_uuid: process.env.ANKYSYNC_SIGNER,
          parent: rootCastHash
        };
        const neynarResponse = axios.post(
          "https://api.neynar.com/v2/farcaster/cast",
          castOptions,
          {
            headers: {
              api_key: process.env.NEYNAR_API_KEY,
            },
          }
        );
      } catch (error) {
        
      }
      
      return c.res({
        image: (

          <div
          style={{
                alignItems: 'center',
                background:'linear-gradient(to right, #432889, #17101F)',
                backgroundSize: '100% 100%',
                display: 'flex',
                flexDirection: 'column',
                flexWrap: 'nowrap',
                height: '100%',
                justifyContent: 'center',
                textAlign: 'center',
                width: '100%',
              }}>
              <div
      style={{
        color: 'white',
        fontSize: 50,
        fontStyle: 'normal',
        letterSpacing: '-0.025em',
        lineHeight: 1,
        display: "flex",
        marginTop: 30,
        padding: '0 120px',
        whiteSpace: 'pre-wrap',
      }}
    >
             {poiesisResponse?.data.replyToUser}
    </div>
    <div
      style={{
        color: 'orange',
        fontSize: 40,
        fontStyle: 'normal',
        letterSpacing: '-0.025em',
        lineHeight: 1,
        display: "flex",
        marginTop: 30,
        padding: '0 120px',
        whiteSpace: 'pre-wrap',
      }}
    >
             (your choice was commented below the first cast where this frame was shared)
    </div>

    </div>
        ),
        intents: [
          <Button.Link href={`https://warpcast.com/jpfraneto/${rootCastHash.slice(0,10)}`}>read comments</Button.Link>,
          <Button.Link href="https://warpcast.com/~/compose?text=choose%20the%20most%20legendary%20human%20of%20our%20time%20on%20the%20frame%20below%20%F0%9F%91%87%F0%9F%8F%BD%20%28credits%3A%20%40jpfraneto%29&embeds[]=https://bangercaster.xyz/api
          ">share frame</Button.Link>,
        ],
      })
    } else {
      return c.res({
        image: (
<div
style={{
      alignItems: 'center',
      background:'linear-gradient(to right, #432889, #17101F)',
      backgroundSize: '100% 100%',
      display: 'flex',
      flexDirection: 'column',
      flexWrap: 'nowrap',
      height: '100%',
      justifyContent: 'center',
      textAlign: 'center',
      width: '100%',
    }}>
    <div
style={{
color: 'white',
fontSize: 50,
fontStyle: 'normal',
letterSpacing: '-0.025em',
lineHeight: 1,
display: "flex",
marginTop: 30,
padding: '0 120px',
whiteSpace: 'pre-wrap',
}}
>
{`${userInput} is not a legendary human. please try again`}
</div>

</div>
        ),
        intents: [
          <TextInput placeholder="ricky martin, cristiano ronaldo, etc." />,
          <Button value="reply">try again</Button>,
        ],
      })
    }
  }
})

devtools(app, { serveStatic })

export const GET = handle(app)
export const POST = handle(app)
