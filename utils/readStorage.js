const fs = require("fs");


const readFileProxy = async () => {
    fs.readdir('./storage', (error, files) => {
        if (error) {
            throw error;    
        }
        fs.readFile('storage/proxy.txt', 'UTF-8', (error, archivo) => {
            if (error) {
                throw error;
            }
            const proxy = archivo.split(",")
            return proxy;
        })
        // console.log("contenido del archivo");
    })
}

const readFileAccounts = async () => {
    fs.readdir('./storage', (error, files) => {
        if (error) {
            throw error;    
        }
        fs.readFile('storage/accounts.txt', 'UTF-8', (error, archivo) => {
            if (error) {
                throw error;
            }
            const accounts = archivo.split(",")
            return accounts;
        })
        // console.log("contenido del archivo");
    })
}

const readFileModels = async () => {
    fs.readdir('./storage', (error, files) => {
        if (error) {
            throw error;    
        }
        fs.readFile('storage/models.txt', 'UTF-8', (error, archivo) => {
            if (error) {
                throw error;
            }
            const models = archivo.split(",")
            return models;
        })
        // console.log("contenido del archivo");
    })
}

module.exports = {readFileProxy, readFileAccounts, readFileModels}