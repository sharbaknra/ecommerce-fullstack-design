import camera from './assets/assets/assets/Image/tech/camera.png'
import earphone from './assets/assets/assets/Image/tech/earphone.png'
import electricKettle from './assets/assets/assets/Image/tech/electric kettle.png'
import gamingEarphone from './assets/assets/assets/Image/tech/gaming earphone.png'
import iphone from './assets/assets/assets/Image/tech/iphone.png'
import laptop from './assets/assets/assets/Image/tech/laptop.png'
import smartphone from './assets/assets/assets/Image/tech/smart phone.png'
import smartwatch from './assets/assets/assets/Image/tech/smart watches.png'
import tablet from './assets/assets/assets/Image/tech/tablet.png'
import bag from './assets/assets/assets/Layout/alibaba/Image/cloth/bag.png'
import blazerCoat from './assets/assets/assets/Layout/alibaba/Image/cloth/blazer coat.png'
import shirt from './assets/assets/assets/Layout/alibaba/Image/cloth/shirt.png'
import shortJeans from './assets/assets/assets/Layout/alibaba/Image/cloth/short jeans.png'
import wallet from './assets/assets/assets/Layout/alibaba/Image/cloth/wallet.png'
import sofa from './assets/assets/assets/Image/interior/sofa.png'
import rack from './assets/assets/assets/Image/interior/rack.png'
import lamp from './assets/assets/assets/Image/interior/lamp.png'

const imageMap = {
  camera, earphone, electricKettle, gamingEarphone,
  iphone, laptop, smartphone, smartwatch, tablet,
  bag, blazerCoat, shirt, shortJeans, wallet,
  sofa, rack, lamp,
}

export const getImage = (key) => imageMap[key] || camera

export default imageMap
