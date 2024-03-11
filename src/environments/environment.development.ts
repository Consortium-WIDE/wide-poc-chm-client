export const environment = {
    production: false,
    chmApiUri: 'http://localhost:3400',
    wideUri: 'http://localhost:4200',
    hostUri: 'http://localhost:4400',
    wideRegisterUserPoap: {
        domain: 'cryptohubmalta.org',
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
                "type": ["poap"],
                "credentialSubject": {
                    "eventUrl": "https://wid3.xyz"
                }
            }
        }
    },
    widePoap: {
        domain: 'cryptohubmalta.org',
        serverPresentationUrl: 'http://localhost:4200/present',
        wideApiUri: 'http://localhost:3000',
        wideConfig: {
            "rpName": "Crypto Hub Malta",
            "serverApiEndpoint": 'http://localhost:3400/wide/uploadData',
            "sourceUri": "http://localhost:4400",
            "redirectUri": "http://localhost:4400/claimpoap",
            "logoUri": "http://localhost:4400/assets/svg/cryptohub_malta_logo.svg",
            "iconUri": "http://localhost:4400/assets/icon.png",
            "requireMessageSignature": true,
            "credential": {
                "type": ["poap"],
                "credentialSubject": {
                    "eventUrl": "https://wid3.xyz"
                }
            }
        }
    },
    wideMembership: {
        domain: 'cryptohubmalta.org',
        serverPresentationUrl: 'http://localhost:4200/present',
        wideApiUri: 'http://localhost:3000',
        wideConfig: {
            "rpName": "Crypto Hub Malta",
            "serverApiEndpoint": 'http://localhost:3400/wide/login',
            "sourceUri": "http://localhost:4400",
            "redirectUri": "http://localhost:4400/login",
            "logoUri": "http://localhost:4400/assets/svg/cryptohub_malta_logo.svg",
            "iconUri": "http://localhost:4400/assets/icon.png",
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
        serverPresentationUrl: 'http://localhost:4200/present',
        wideApiUri: 'http://localhost:3000',
        wideConfig: {
            "rpName": "Crypto Hub Malta",
            "serverApiEndpoint": 'http://localhost:3400/wide/uploadData',
            "sourceUri": "http://localhost:4400",
            "redirectUri": "http://localhost:4400/processProfile/email",
            "logoUri": "http://localhost:4400/assets/svg/cryptohub_malta_logo.svg",
            "iconUri": "http://localhost:4400/assets/icon.png",
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
        logoUri: 'http://localhost:4400/assets/svg/cryptohub_malta_logo.svg'
    }
};