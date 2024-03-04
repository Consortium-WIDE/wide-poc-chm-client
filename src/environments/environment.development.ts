export const environment = {
    production: false,
    chmApiUri: 'http://localhost:3400',
    wideUri: 'http://localhost:4200',
    wide: {
        domain: '/cryptohubmalta.org',
        serverPresentationUrl: 'http://localhost:4200/present',
        wideApiUri: 'http://localhost:3000',
        wideConfig: {
            "rpName": "Crypto Hub Malta",
            "serverApiEndpoint": 'http://localhost:3400/wide/uploadData',
            "sourceUri": "http://localhost:4400",
            "redirectUri": "http://localhost:4400/process",
            "logoUri": "http://localhost:4400/assets/svg/cryptohub_malta_logo.svg",
            "iconUri": "http://localhost:4400/assets/icon.png",
            "requireMessageSignature": true,
            "credential": {
                //TODO!!!
                //"type": ["um.edu.mt", "google", "oauth"]
                "type": ["poap"],
                "eventUrl": "https://wid3.xyz"
            },
            "require": {
                "plainText": [
                    "name"
                ],
                "proofOf": [
                    "id"
                ]
            }
        }
    }
};