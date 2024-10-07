import { useEffect, useState } from "react";
import s from "./Canvas.module.css";

function Canvas() {
    const heightTop = 150;
    const widthCertificate = 556;
    const widthImage = 436;
    const heightBottom = 300;
    const [heightCanvas, setHeightCanvas] = useState(1000);
    const [imageSrc, setImageSrc] = useState("/create_certificate/example.png");
    const [artist, setArtist] = useState("");
    const [title, setTitle] = useState("");
    const [material, setMaterial] = useState("");
    const [country, setCountry] = useState("");
    const [year, setYear] = useState("");
    const [dimensions, setDimensions] = useState("");

    const draw = (image, ctx) => {

        image.onload = () => {
            const imageOriginalHeight = image.naturalHeight;
            const imageOriginalWidth = image.naturalWidth;
            const newHeightImage = (imageOriginalHeight / imageOriginalWidth) * widthImage;
            ctx.clearRect(0, 0, widthCertificate, heightCanvas);

            setHeightCanvas(heightTop + newHeightImage + heightBottom);

            ctx.fillStyle = "#ffffff";
            ctx.fillRect(0, 0, widthCertificate, heightTop + newHeightImage + heightBottom);

            ctx.drawImage(image, 60, heightTop, widthImage, newHeightImage);

            ctx.font = "1000 22px Roboto";
            ctx.fillStyle = "#000000";
            ctx.textAlign = "center"
            ctx.fillText("CERTIFICATE", widthCertificate/2, 22+26);
            ctx.fillText("OF", widthCertificate/2, 22+64);
            ctx.fillText("AUTHENTICITY", widthCertificate/2, 22+104);

            ctx.font = "11px Roboto";
            ctx.fillText("guarantees authenticity and quality", widthCertificate/2, 11+134);

            const contentHeight = heightTop + newHeightImage;
            ctx.textAlign = "left";
            ctx.font = "bold 16px Arial";
            ctx.fillText("ARTIST", 62, 21+contentHeight);
            ctx.fillText("TITLE OF", 62, 54+16+contentHeight);
            ctx.fillText("ARTWORK", 62, 54+23+16+contentHeight);
            ctx.fillText("MATERIAL AND", 62, 128+16+contentHeight);
            ctx.fillText("TECHNIQUE", 62, 153+16+contentHeight);
            ctx.fillText("DATE SIGNED", 62, 191+16+contentHeight);
            ctx.fillText("COUNTRY OF ORIGIN", 315, 5+16+contentHeight);
            ctx.fillText("YEAR", 440, 55+16+contentHeight);
            ctx.fillText("DIMENSIONS", 383, 103+16+contentHeight);
            ctx.fillText("ARTIST", 428, 164+16+contentHeight);
            ctx.fillText("SIGNATURE", 394, 188+16+contentHeight);

            ctx.font = "600 16px Laila";
            ctx.fillText(artist, 62, 42+contentHeight);
            ctx.fillText(title, 62, 45+54+16+contentHeight);
            ctx.fillText(material, 166, 152+16+contentHeight);

            ctx.textAlign = "right";
            ctx.fillText(country, 484, 26+16+contentHeight);
            ctx.fillText(year, 484, 76+16+contentHeight);
            ctx.fillText(dimensions, 484, 126+16+contentHeight);
        };

        image.onerror = (error) => {
            console.error("Error loading image:", error);
        };
    }

    useEffect(() => {
        const canvas = document.getElementById("certificate");
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const image = new Image();
        image.src = imageSrc;
        draw(image, ctx);
    }, [heightCanvas, imageSrc, artist, title, material, country, year, dimensions]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const fileURL = URL.createObjectURL(file);
            setImageSrc(fileURL);
        }
    };

    const handleDownload = () => {
        const canvas = document.getElementById("certificate");
        const imageURL = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = imageURL;
        link.download = "certificate.png";
        link.click();
    };

    return (
        <main className={s.main}>
            <section className={s.form}>
                <input type="text" placeholder="Artist" onChange={(e)=>(setArtist(e.target.value))}/><br/>
                <input type="text" placeholder="Title" onChange={(e)=>(setTitle(e.target.value))}/><br/>
                <input type="text" placeholder="Material" onChange={(e)=>(setMaterial(e.target.value))}/><br/>
                <input type="text" placeholder="Country" onChange={(e)=>(setCountry(e.target.value))}/><br/>
                <input type="number" placeholder="Year" onChange={(e)=>(setYear(e.target.value))}/><br/>
                <input type="text" placeholder="Dimensions" onChange={(e)=>(setDimensions(e.target.value))}/><br/>

                <input type="file" id="fileImage" onChange={handleFileChange} accept="image/*"/><br/>
                <button onClick={handleDownload}>Download Image</button>
            </section>
            <section>
                <canvas className={s.canvas} id="certificate" width={widthCertificate} height={heightCanvas}></canvas>
            </section>
        </main>
    );
}

export default Canvas;
