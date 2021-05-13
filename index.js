const headerEl = document.querySelector('header')
const scrollToTop = document.querySelector('.scrollToTop')

window.addEventListener('scroll', () => {
  // 获取元素本身的高度
  let height = headerEl.getBoundingClientRect().height
  if(window.pageYOffset - height > 467) {
    if(!headerEl.classList.contains('sticky')) {
      headerEl.classList.add('sticky');
    }
  }else {
    headerEl.classList.remove('sticky')
  }

  if(window.pageYOffset > 2000) {
    scrollToTop.style.display = 'block'
  }else {
    scrollToTop.style.display = 'none'
  }
})



// 加载类名为glide的div给glide库
const glide = new Glide('.glide')
const captionsEl = document.querySelectorAll('.slide-caption')

glide.on(['mount.after', 'run.after'], () => {
  // 返回当前轮播的索引（下标）
  const caption = captionsEl[glide.index]
  // 配置anime动画
  anime({
    targets: caption.children,
    // 透明度是从0 到 1 
    opacity: [0, 1],
    // 动画执行时间，400ms
    duration: 400,
    // 动画执行函数,  linear线性 也就是平滑执行
    easing: 'linear',
    // anime.stagger()设定交错开始值, 延迟第一个元素从300ms开始，然后之后每隔元素元素增加400ms
    delay: anime.stagger(400, {start: 300}),
    // 从y轴出现的距离，40到10，第一个最长，最后一个最短，最终到0  自己的位置
    translateY: [anime.stagger([40,10]), 0]
  })
})


glide.on('run.before', () => {
  document.querySelectorAll('.slide-caption > *').forEach( el => {
    el.style.opacity = 0
  })
})

glide.mount()

const isotope = new Isotope('.cases', {
  layoutMode: 'fitRows',
  itemSelector: '.case-item'
})

// 成功案例代码部分，使用isotope库
const filterBtns = document.querySelector('.filter-btns')
filterBtns.addEventListener('click', e => {
  let { target } = e
  const filterOption = target.getAttribute('data-filter')
  if(filterOption) {
    // 去掉所有btn的active类名
    document.querySelectorAll('.filter-btn.active').forEach(btn => btn.classList.remove('active'))
    // 给选中的加上
    target.classList.add('active')

    // 给isotope传递筛选选项
    isotope.arrange({ filter: filterOption })
  }
})

// ScrollReveal动画配置项
const staggeringOption = {
  delay: 300,
  distance: '50px',
  duration: 500,
  easing: 'ease-in-out',
  origin: 'bottom'
}

const dataSectionEl = document.querySelector('.data-section')

ScrollReveal().reveal('.feature', {...staggeringOption, interval: 350})
ScrollReveal().reveal('.service-item', {...staggeringOption, interval: 350})
ScrollReveal().reveal('.data-section', {
  beforeReveal: () => {
    anime({
      targets: '.data-piece .num',
      innerHTML: el => {
        return [0, el.innerHTML]
      },
      duration: 2000,
      round: 1,
      easing: 'easeInExpo'
    })
    dataSectionEl.style.backgroundPosition = `center cale(50% - ${dataSectionEl.getBoundingClientRect().bottom / 3}px)`
  }
})

window.addEventListener('scroll', () => {
  // 元素底部和顶部  底部大于> 0则表示刚出现  top < window.innerHeight则表示即将划出去了 
  const bottom = dataSectionEl.getBoundingClientRect().bottom
  const top = dataSectionEl.getBoundingClientRect().top

  if(bottom >= 0 && top <= window.innerHeight) {
    dataSectionEl.style.backgroundPosition = `center calc(50% - ${bottom / 5}px)`
  }
})

const scroll = new SmoothScroll('nav a[href*="#"], .scrollToTop a[href*="#"]', {
  header: 'header',
  offset: 80
})

document.addEventListener('scrollStart', () => {
  // 对文档进行监听，如果滑动开始的时候 有 open 类，就去掉  关闭菜单栏
  if(headerEl.classList.contains('open')) {
    headerEl.classList.remove('open')
  }
})

const exploreBtnEls = document.querySelectorAll('.explore-btn')
exploreBtnEls.forEach(exploreBtnEl => {
  exploreBtnEl.addEventListener('click', () => {
    scroll.animateScroll(document.querySelector('#about-us'))
  })
})

// 折叠按钮
const burgerEl = document.querySelector('.burger')
burgerEl.addEventListener('click', () => {
  headerEl.classList.toggle('open')
})