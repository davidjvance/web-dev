import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get("/", async (req, res) => {
    try {
        const response = await axios.get("http://api.open-notify.org/iss-now.json");
        const result = response;
        const lat = result.data.iss_position.latitude;
        const lon = result.data.iss_position.longitude;
        res.render("index.ejs", { lat: lat, lon: lon }); 
        document.getElementById("mapBtn").onclick = () => { 
            window.open(`https://www.google.com/maps/search/?q=${lat},${lon}`, "_blank");
        }
        
    } catch (error) {
        console.error(error.response.data);
        res.status(500).send("Failed to fetch random activity.");
    } 
});




app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});