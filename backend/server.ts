import http, { IncomingMessage, ServerResponse } from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, '../data.json');

const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
    // Configurações de CORS para aceitar tudo do Front
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return; }

    const urlParts = req.url?.split('/') || [];
    const idNoPath = parseInt(urlParts[urlParts.length - 1]);

    // --- ROTA GET: Listar ---
    if (req.url === '/api/dados' && req.method === 'GET') {
        fs.readFile(filePath, 'utf-8', (err, data) => {
            res.writeHead(200);
            res.end(data);
        });
    } 

    // --- ROTA POST: Criar ---
    else if (req.url === '/api/dados' && req.method === 'POST') {
        let corpo = '';
        req.on('data', chunk => corpo += chunk);
        req.on('end', () => {
            const novaTec = JSON.parse(corpo);
            fs.readFile(filePath, 'utf-8', (err, data) => {
                const lista = JSON.parse(data);
                novaTec.id = Date.now();
                lista.push(novaTec);
                fs.writeFile(filePath, JSON.stringify(lista, null, 2), () => {
                    res.writeHead(201);
                    res.end(JSON.stringify(novaTec));
                });
            });
        });
    }

    // --- ROTA PUT: Editar ---
    else if (req.url?.startsWith('/api/dados/') && req.method === 'PUT') {
        let corpo = '';
        req.on('data', chunk => corpo += chunk);
        req.on('end', () => {
            const dadosAtualizados = JSON.parse(corpo);
            fs.readFile(filePath, 'utf-8', (err, data) => {
                let lista = JSON.parse(data);
                lista = lista.map((item: any) => item.id === idNoPath ? { ...item, ...dadosAtualizados, id: idNoPath } : item);
                fs.writeFile(filePath, JSON.stringify(lista, null, 2), () => {
                    res.writeHead(200);
                    res.end(JSON.stringify({ message: "Atualizado!" }));
                });
            });
        });
    }

    // --- ROTA DELETE: Deletar ---
    else if (req.url?.startsWith('/api/dados/') && req.method === 'DELETE') {
        fs.readFile(filePath, 'utf-8', (err, data) => {
            let lista = JSON.parse(data);
            lista = lista.filter((item: any) => item.id !== idNoPath);
            fs.writeFile(filePath, JSON.stringify(lista, null, 2), () => {
                res.writeHead(200);
                res.end(JSON.stringify({ success: true }));
            });
        });
    }
});

server.listen(3000, () => console.log("🚀 Server CRUD Full rodando!"));