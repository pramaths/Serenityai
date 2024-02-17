import { useEffect } from 'react'

const Chatbot2 = () => {
    useEffect(() => {
        const script = document.createElement('script')
        script.src = 'https://cdn.botpress.cloud/webchat/v1/inject.js'
        script.async = true
        document.body.appendChild(script)

        script.onload = () => {

            window.botpressWebChat.init({
                "composerPlaceholder": "Chat with Serenity.ai",
                "botConversationDescription": "Here to Help You",
                "botId": "6e47a460-a29a-4fee-acb0-36d50df55b12",
                "hostUrl": "https://cdn.botpress.cloud/webchat/v1",
                "messagingUrl": "https://messaging.botpress.cloud",
                "clientId": "6e47a460-a29a-4fee-acb0-36d50df55b12",
                "webhookId": "e19f1b81-68b3-4612-acf8-38b3f1ea18a0",
                "lazySocket": true,
                "themeName": "prism",
                "botName": "Serenity.ai",
                "avatarUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpP4hUzKqtw5HupwIrv-S2BH6wQKiuK2CjIg&usqp=CAU",
                "stylesheet": "https://webchat-styler-css.botpress.app/prod/code/1a5fe412-0da6-4e97-aece-b6f3b9c42726/v66467/style.css",
                "frontendVersion": "v1",
                "useSessionStorage": true,
                "theme": "prism",
                "themeColor": "#2563eb"
            });
        }
    }, [])

    return <div id="webchat" />
}

export default Chatbot2