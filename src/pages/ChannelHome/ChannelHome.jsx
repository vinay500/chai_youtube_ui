import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import SearchIcon from '@mui/icons-material/Search'
import Banner from "../../img/channels4_banner.jpg";
import ProfileImg from "../../img/channels4_profile.jpg";
import ChannelVideo from "../../img/channel_video.jpg"
import "./ChannelHome.css"

export default function ChannelHome() {
return (
<div id="channel_home_page" className="bg-black text-white min-h-screen">
  <div className="relative" id="channel_header">
    {/* <Image
      src={LamaTube}
      alt="Channel banner"
      width={1200}
      height={250}
      className="w-full h-[250px] object-cover"
    /> */}
    <img id="channel_banner" src={Banner} alt="Channel avatar" className="object-cover" />
    <div id="channel_info" className="absolute bottom-4 left-4 flex items-end space-x-4">
      <img
        src={ProfileImg}
        alt="Channel avatar"
        width={100}
        height={100}
        className="rounded-full border-2 border-white"
      />
      <div id="channel_details">
        <div>
          <h1 className="text-2xl font-bold" id="channel_name">Harkirat Singh</h1>
          <p className="text-sm" id="channel_subs_videos"> 458K subscribers • 228 videos</p>
        </div>
        <div id="channel_actions" className="absolute bottom-4 right-4 flex items-center space-x-2">
          <button className="subscribe-button">Subscribe</button>
          <button className="icon-button">
            <NotificationsNoneIcon />
          </button>
        </div>
      </div>
    </div>
  </div>
  <nav className="flex justify-between items-center p-4 border-b border-gray-700">
    <div className="flex space-x-4">
    {/* <button class="nav-button">Home</button> */}
    <button class="nav-button">Videos</button>
    {/* <button class="nav-button">Live</button>
    <button class="nav-button">Podcasts</button>
    <button class="nav-button">Playlists</button>
    <button class="nav-button">Community</button> */}
    </div>
    {/* <button class="icon-button">
      <span class="material-icons">search</span>
    </button> */}
  </nav>
  <main className="p-4">
    <div className="flex items-start space-x-4 channel_video">
      <div>
        <img
          src={ChannelVideo}
          alt="Video thumbnail"
          // width={320}
          // height={180}
          width={251}
          height={141}
          className="rounded-lg"
        />
      </div>
      <div>
        <h2 className="text-xl font-semibold">Four years after IIT in Four Minutes</h2>
        <p className="text-sm text-gray-400">Harkirat Singh • 1.2M views • 1 year ago</p>
        <p className="mt-2 text-sm">
          The video describes my journey 4 years after graduating from IIT Roorkee. Hope you all like it My links
          https://twitter.com/kirat_tw https://linkedin.com/in/kirat-li https://www.instagram.com/kir...
        </p>
      </div>
    </div>
    <div className="flex items-start space-x-4 channel_video">
      <div>
        <img
          src={ChannelVideo}
          alt="Video thumbnail"
          // width={320}
          // height={180}
          width={251}
          height={141}
          className="rounded-lg"
        />
      </div>
      <div>
        <h2 className="text-xl font-semibold">Four years after IIT in Four Minutes</h2>
        <p className="text-sm text-gray-400">Harkirat Singh • 1.2M views • 1 year ago</p>
        <p className="mt-2 text-sm">
          The video describes my journey 4 years after graduating from IIT Roorkee. Hope you all like it My links
          https://twitter.com/kirat_tw https://linkedin.com/in/kirat-li https://www.instagram.com/kir...
        </p>
      </div>
    </div>
    <div className="flex items-start space-x-4 channel_video">
      <div>
        <img
          src={ChannelVideo}
          alt="Video thumbnail"
          // width={320}
          // height={180}
          width={251}
          height={141}
          className="rounded-lg"
        />
      </div>
      <div>
        <h2 className="text-xl font-semibold">Four years after IIT in Four Minutes</h2>
        <p className="text-sm text-gray-400">Harkirat Singh • 1.2M views • 1 year ago</p>
        <p className="mt-2 text-sm">
          The video describes my journey 4 years after graduating from IIT Roorkee. Hope you all like it My links
          https://twitter.com/kirat_tw https://linkedin.com/in/kirat-li https://www.instagram.com/kir...
        </p>
      </div>
    </div>
    <div className="flex items-start space-x-4 channel_video">
      <div>
        <img
          src={ChannelVideo}
          alt="Video thumbnail"
          // width={320}
          // height={180}
          width={251}
          height={141}
          className="rounded-lg"
        />
      </div>
      <div>
        <h2 className="text-xl font-semibold">Four years after IIT in Four Minutes</h2>
        <p className="text-sm text-gray-400">Harkirat Singh • 1.2M views • 1 year ago</p>
        <p className="mt-2 text-sm">
          The video describes my journey 4 years after graduating from IIT Roorkee. Hope you all like it My links
          https://twitter.com/kirat_tw https://linkedin.com/in/kirat-li https://www.instagram.com/kir...
        </p>
      </div>
    </div>
    <div className="flex items-start space-x-4 channel_video">
      <div>
        <img
          src={ChannelVideo}
          alt="Video thumbnail"
          // width={320}
          // height={180}
          width={251}
          height={141}
          className="rounded-lg"
        />
      </div>
      <div>
        <h2 className="text-xl font-semibold">Four years after IIT in Four Minutes</h2>
        <p className="text-sm text-gray-400">Harkirat Singh • 1.2M views • 1 year ago</p>
        <p className="mt-2 text-sm">
          The video describes my journey 4 years after graduating from IIT Roorkee. Hope you all like it My links
          https://twitter.com/kirat_tw https://linkedin.com/in/kirat-li https://www.instagram.com/kir...
        </p>
      </div>
    </div>
  </main>
</div>
)
}