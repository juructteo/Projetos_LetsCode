const http = require("http");
const fs = require("fs");



const readCharacters = (callback) => {
    return fs.promises.readFile("./avatar_characters.json")
            .then((buffer) => {
                const charac = JSON.parse(buffer.toString());

                callback(charac);
            })
            .catch((error) => {
                console.error(error);
                
            });
}

const server = http.createServer((req, res) => {
    const {url, method} = req;

    console.log(url, method);

    if (url == "/") {
        if (method == "GET") {
            return readCharacters((benders) => {
                res.setHeader('Content-Type', 'text/html;charset=utf-8');

               
                 let string_benders = "";
                 for(let bender of benders) {
                     string_benders += `<img src=${bender.imagem}  width="20%" height="20%"> 
                     </br>
                     <li>${bender.id}-${bender.nome} (${bender.naçao}|${bender.dominacao})</li> `;
                }

                res.end(`
                    <h1>Personagens Avatar</h1>
                    <ul>
                        ${string_benders}
                    </ul>
                `);
             
            });
        } else if (method == "POST") {
            return readCharacters((benders) => {
                req.on('data', new_bender => {
                    new_bender = JSON.parse(new_bender);
                    new_bender.id = benders.last_id + 1;
                    benders.data.push(new_bender);
                    benders.last_id = new_bender.id;
                    
                    
                    fs.promises.writeFile("./avatar_characters.json", JSON.stringify(benders));

                    res.end(`Adicionado ${JSON.stringify(new_bender)}!`);
                });
            })
        } else if (method == "PUT") {
            return readCharacters((benders) => {
                req.on('data', update_bender => {
                    update_bender = JSON.parse(update_bender);
                    
                    const id = update_bender.id;

                    const bender_idx = benders.data.findIndex((bender) => {
                        return bender.id == id;
                    })

                    if (update_bender.nome != undefined){
                    benders.data[bender_idx].nome = update_bender.nome;
                    } 
                     if (update_bender.nacao != undefined){
                        benders.data[bender_idx].nacao = update_bender.nacao;
                    }
                     if (update_bender.dominacao != undefined){
                        benders.data[bender_idx].dominacao = update_bender.dominacao;
                    }
                    if (update_bender.imagem != undefined){
                        benders.data[bender_idx].imagem = update_bender.imagem;
                    }



                    fs.promises.writeFile("./avatar_characters.json", JSON.stringify(benders));

                    res.end(`Atualizado ${JSON.stringify(update_bender)}!`);
                });
            })
        } else if (method == "DELETE"){
            return readCharacters((benders) => {
                req.on('data', update_bender => {
                    update_bender = JSON.parse(update_bender);
                    
                    const id = update_bender.id;

                    const bender_idx = benders.findIndex((bender) => {
                        return bender.id == id;
                    })

                    if (bender_idx != -1) {
                        benders.data.splice(bender_idx, 1);
                        fs.promises.writeFile("./avatar_characters.json", JSON.stringify(benders));

                        return res.end(`Deleted ${JSON.stringify(update_bender)}!`);
                    }

                    res.writeHead(404);
                    res.end('BENDER NOT FOUND');
                });
            })
        }
    }

    res.writeHead(404);
    return res.end('PAGE NOT FOUND');
});

server.listen(8080, 'localhost', () => {
    const address = server.address();
    console.log(`Servidor rodando ${address.address}:${address.port}`);
});