const http = require('http');
const fs = require('fs');
const path = require('path');

const {MongoClient} = require('mongodb');
http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    console.log(req.url);
    if(req.url ==='/'){
        fs.readFile(path.join(__dirname,'public','index.html'),(err,content)=>{
            if (err) throw err;
            res.writeHead(200,{'content-Type':'text/html'})
            res.end(content)
        })
    }
    else if (req.url=='/api'){
        async function main(){
            /**
             * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
             * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
             */
            
            const uri ="mongodb+srv://illurugovardhanreddy:Password123@cluster0.gjd9arz.mongodb.net/?retryWrites=true&w=majority"
            const client = new MongoClient(uri); 
            try {
                // Connect to the MongoDB cluster
                await client.connect();
                // Make the appropriate DB calls
                //await  listDatabases(client);
                const results =await findsomedata(client);
            
                console.log("********")
                console.log(results)
                
                res.writeHead(200,{'content-Type':'application/json'})
                res.end(results)

         
            } catch (e) {
                console.error(e);
            } finally {
                await client.close();
            }
        }     
        main().catch(console.error);
 
    } 
}).listen(process.env.PORT,()=>console.log("Server is running"));

async function findsomedata(client ){
    const cursor = client.db("gotbooksdatabase").collection("gotbooks_Env").find({});
    const results = await cursor.toArray();
    //console.log(results);
    const js= (JSON.stringify(results));
    console.log(typeof js)
    // console.log(js);
    return js 
};