import './styles/index.css';
import ZJLImage from './img/zjl.jpg';
import PrintLog from './some';
import Print from './print';
import AlertFunc from './alert';
import XMLData from './xml/data.xml';
import global from './global';
import useTs from './useTs.ts';
// import _ from 'lodash';

const createElement = async () => {
    const element = document.createElement('div');
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    return element;
}

const createImage = () => {
    const img = document.createElement('img');
    img.src = ZJLImage;
    return img;
}

const createIcon = (iconName) => {
    const icon = document.createElement('span');
    icon.setAttribute('class', `iconfont${!iconName ? '': ' icon-' + iconName.trim()}`);
    return icon;
}

const logXMLData = () => {
    console.table(XMLData)
}

const root = document.getElementById('root');

setTimeout(() => {
    (async () => {
        root.appendChild(await createElement());
    })()
}, 4000)

const image = createImage()
root.appendChild(image);
root.appendChild(createIcon('telpher'));
root.appendChild(createIcon('search'));
root.appendChild(createIcon('pinglun'));
root.appendChild(createIcon('wwwios'));

image.addEventListener('click', async (e) => {
    const {add} = await import(/* webpackChunkName: "other" */'./other');
    console.log(add(1,2,3));
})

logXMLData();
Print();
PrintLog();
AlertFunc(333);
useTs();
console.log(global);
if(module.hot) {
    module.hot.accept('./some.js', () => {
        PrintLog();
    })
}

// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker.register('/service-worker.js').then(registration => {
//       console.log('SW registered: ', registration);
//     }).catch(registrationError => {
//       console.log('SW registration failed: ', registrationError);
//     });
//   });
// }