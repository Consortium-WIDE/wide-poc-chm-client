export const environment = {
    production: true,
    chmApiUri: 'https://api.cryptohubmalta.wid3-demo.app',
    wideUri: 'https://wid3.app',
    hostUri: 'https://cryptohubmalta.wid3-demo.app',
    wideRegisterUserPoap: {
        domain: 'cryptohubmalta.org',
        serverPresentationUrl: 'https://wid3.app/present',
        wideApiUri: 'https://api.wid3.app',
        wideConfig: {
            "rpName": "Crypto Hub Malta",
            "serverApiEndpoint": 'https://api.cryptohubmalta.wid3-demo.app/wide/uploadData',
            "sourceUri": "https://cryptohubmalta.wid3-demo.app",
            "redirectUri": "https://cryptohubmalta.wid3-demo.app/process",
            "logoUri": "https://cryptohubmalta.wid3-demo.app/assets/svg/cryptohub_malta_logo.svg",
            "iconUri": "https://cryptohubmalta.wid3-demo.app/assets/icon.png",
            "requireMessageSignature": true,
            "credential": {
                "type": ["poap"],
                "credentialSubject": {
                    "eventUrl": "https://linkr.bio/cryptohubmalta"
                }
            }
        }
    },
    widePoap: {
        domain: 'cryptohubmalta.org',
        serverPresentationUrl: 'https://wid3.app/present',
        wideApiUri: 'https://api.wid3.app',
        wideConfig: {
            "rpName": "Crypto Hub Malta",
            "serverApiEndpoint": 'https://api.cryptohubmalta.wid3-demo.app/wide/uploadData',
            "sourceUri": "https://cryptohubmalta.wid3-demo.app",
            "redirectUri": "https://cryptohubmalta.wid3-demo.app/claimpoap",
            "logoUri": "https://cryptohubmalta.wid3-demo.app/assets/svg/cryptohub_malta_logo.svg",
            "iconUri": "https://cryptohubmalta.wid3-demo.app/assets/icon.png",
            "requireMessageSignature": true,
            "credential": {
                "type": ["poap"],
                "credentialSubject": {
                    "eventUrl": "https://linkr.bio/cryptohubmalta"
                }
            }
        }
    },
    wideMembership: {
        domain: 'cryptohubmalta.org',
        serverPresentationUrl: 'https://wid3.app/present',
        wideApiUri: 'https://api.wid3.app',
        wideConfig: {
            "rpName": "Crypto Hub Malta",
            "serverApiEndpoint": 'https://api.cryptohubmalta.wid3-demo.app/wide/login',
            "sourceUri": "https://cryptohubmalta.wid3-demo.app",
            "redirectUri": "https://cryptohubmalta.wid3-demo.app/login",
            "logoUri": "https://cryptohubmalta.wid3-demo.app/assets/svg/cryptohub_malta_logo.svg",
            "iconUri": "https://cryptohubmalta.wid3-demo.app/assets/icon.png",
            "requireMessageSignature": true,
            "credential": {
                "type": ["CryptoHubMalta"]
            },
            "require": {
                "plainText": [
                    "id"
                ]
            }
        }
    },
    wideClaimEmail: {
        domain: 'cryptohubmalta.org',
        serverPresentationUrl: 'https://wid3.app/present',
        wideApiUri: 'https://api.wid3.app',
        wideConfig: {
            "rpName": "Crypto Hub Malta",
            "serverApiEndpoint": 'https://api.cryptohubmalta.wid3-demo.app/wide/uploadData',
            "sourceUri": "https://cryptohubmalta.wid3-demo.app",
            "redirectUri": "https://cryptohubmalta.wid3-demo.app/processProfile/email",
            "logoUri": "https://cryptohubmalta.wid3-demo.app/assets/svg/cryptohub_malta_logo.svg",
            "iconUri": "https://cryptohubmalta.wid3-demo.app/assets/icon.png",
            "requireMessageSignature": true,
            "credential": {
                "type": ["oauth"]
            },
            "require": {
                "plainText": [
                    "email"
                ]
            }
        }
    },
    popupConfig: {
        sourceName: 'Crypto Hub Malta',
        logoUri: 'https://cryptohubmalta.wid3-demo.app/assets/svg/cryptohub_malta_logo.svg'
    }
};