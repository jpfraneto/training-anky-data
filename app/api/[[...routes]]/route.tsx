/** @jsxImportSource frog/jsx */

import { Button, Frog, TextInput } from 'frog'
import { devtools } from 'frog/dev'
// import { neynar } from 'frog/hubs'
import { handle } from 'frog/next'
import { serveStatic } from 'frog/serve-static'
import axios from 'axios'

const app = new Frog({
  assetsPath: '/',
  basePath: '/api',
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

// for installing the cast action
app.frame('/install-save-this-reply', (c) => {
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
            add "save this reply" action
            </div>
      </div>
    ),
    intents: [
      <Button.AddCastAction action="/save-this-reply-action">
        add
      </Button.AddCastAction>,
    ]
  })
})

// cast action trigger that displays the frame
app.castAction(
  '/save-this-reply-action',
  (c) => {
    console.log("inside the save this reply action")
    const { actionData } = c
    const { castId, fid, messageHash, network, timestamp, url } = actionData
    console.log(
      `Cast Action to ${JSON.stringify(c.actionData.castId)} from ${
        c.actionData.fid
      }`,
    )
    // TODO - GET THE CAST HASH FROM THE ROOT CAST ASSOCIATED WITH THIS MESSAGE HASH
    const rootCastHash = "0xrootCastHashhhhhh"
    return c.res({ type: 'frame', path: `/save-this-reply-frame/${rootCastHash}/${castId}` })
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

devtools(app, { serveStatic })

export const GET = handle(app)
export const POST = handle(app)
