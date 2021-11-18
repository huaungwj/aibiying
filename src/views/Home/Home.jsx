import HomeStyle from "./Home.module.css";

export default function Home() {
    return (
        <div className={HomeStyle.homeContainer}>
            <div className={`${HomeStyle.bannerBox} aby_container`}>
                <span className={`ThemeColor ${HomeStyle.bannerText}`}>
                    Airbnb 爱彼迎{" "}
                </span>
                <p>全球 700 万民宿任你挑</p>
            </div>
        </div>
    );
}
