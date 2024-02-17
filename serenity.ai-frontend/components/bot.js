import { useEffect } from 'react'

const Chatbot = () => {
    useEffect(() => {
        const script = document.createElement('script')
        script.src = 'https://cdn.botpress.cloud/webchat/v1/inject.js'
        script.async = true
        document.body.appendChild(script)

        script.onload = () => {

            window.botpressWebChat.init({
                "composerPlaceholder": "Chat with Serentiy.ai",
                "botConversationDescription": "Your HealthCare Companion",
                "botId": "f8385385-d8d8-4362-80c1-cae49466d8a7",
                "hostUrl": "https://cdn.botpress.cloud/webchat/v1",
                "messagingUrl": "https://messaging.botpress.cloud",
                "clientId": "f8385385-d8d8-4362-80c1-cae49466d8a7",
                "webhookId": "fb5f1471-f89b-48c6-880b-378d4bd7f8ab",
                "lazySocket": true,
                "themeName": "prism",
                "botName": "Serenity.ai",
                "avatarUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpP4hUzKqtw5HupwIrv-S2BH6wQKiuK2CjIg&usqp=CAU",
                "stylesheet": "https://webchat-styler-css.botpress.app/prod/code/1a5fe412-0da6-4e97-aece-b6f3b9c42726/v97759/style.css",
                "frontendVersion": "v1",
                "useSessionStorage": true,
                "theme": "prism",
                "themeColor": "#2563eb"
            });


        }
    }, [])

    return <div id="webchat" />
}

export default Chatbot