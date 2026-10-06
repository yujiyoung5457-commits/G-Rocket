import React,{ useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const App = () => {
  const svgRef=useRef()
  const rocketRef=useRef()
  const bodyRef=useRef()
  const windowRef=useRef()
  const leftWings=useRef()
  const rightWing=useRef()
  const fireRef=useRef()
  const starRef=useRef()
  const starSvgRef=useRef()

  useEffect(()=>{
    const ctx=gsap.context(()=>{
      //svg그리기 로켓본체랑 창문만 그리기
      const shapes=svgRef.current.querySelectorAll('.draw')
      shapes.forEach((item)=>{
        const len=item.getTotalLength()
        item.style.strokeDasharray=len
        item.style.strokeDashoffset=len

        gsap.set(item,{
          // fill:'transparent',  //초기세팅::색상제거

        })
      })


      gsap.set(rocketRef.current,{
        y:-200,
      })
      gsap.set(fireRef.current, {
        opacity: 0,
        scaleY: 0,
        transformOrigin: 'top center',//상단고정
        transFormBox:'fill-box', //박스로 묶음

      })

      gsap.set(starRef.current, {
        opacity: 0,
        fill: 'transparent',
        strokeDasharray: starRef.current.getTotalLength(),
        strokeDashoffset: starRef.current.getTotalLength(),
        transformOrigin: 'top center',//상단고정
        transFormBox:'fill-box', //박스로 묶음

      })
      gsap.set(leftWings.current,{
        opacity:0,
        scale:0,
        rotation: 45,
        transformOrigin: 'right center',
        transformBox: 'fill-box',
      })

        gsap.set(rightWing.current,{
        opacity:0,
        scale:0,
        rotation: -45,
        transformOrigin: 'left center',
        transformBox: 'fill-box',
      })

      // 별 회전축을 별의 정중앙으로 설정
gsap.set(starSvgRef.current, {
  transformOrigin: '50% 50%',
  transformBox: 'fill-box',
})

      // 그리는 단계
      const drawtl=gsap.timeline()
      drawtl.to(rocketRef.current,{
        y:0,
        duration:1.5,
        ease:'power2.out',

      })

        shapes.forEach((item)=>{
          drawtl.to(item,{
            strokeDashoffset:0,
            duration:1,
            ease:'power2.inOut'
          })
        })

        //색상채누기
        drawtl.to(bodyRef.current,{
          fill:'#9cd0ff',
          duration:0.5,
        })

         drawtl.to(windowRef.current,{
          fill:'#ffb8d3',
          duration:0.5,
        }, '<')//바로 앞에 애니메이션과 동시에 시작하라는 의미)

        //날개 펼치기
        const wingTl=gsap.timeline({
          scrollTrigger:{
            trigger:'.section2',
            start: 'top 70%',
            end: 'top 30%',
            scrub: 1,
            markers: false,
          }
        })

        wingTl.to(leftWings.current,{
          opacity:1,
          scale:1,
          rotation: 0,
          duration: 1.2,
        })

        
        wingTl.to(rightWing.current,{
          opacity:1,
          scale:1,
          rotation: 0,
          duration: 1.2,
        }, '<')

    })

    //불꽃
    const fireMove=gsap.to(fireRef.current,{
      scaleY:0.7,
      scaleX: 1.1,
      duration: 0.15,
      repeat: -1,
      yoyo: true,
      paused: true,
    })

    const starSpin = gsap.to(starSvgRef.current, {
      rotation: 360,
      duration: 1.5,
      ease: 'none',
      repeat: -1,
      paused: true,
    })
// 둥실둥실----------------------
    const floatMove = gsap.to(
  [
    bodyRef.current,
    windowRef.current,
    leftWings.current,
    rightWing.current,
  ],
  {
    y: -12,          // 위로 12px
    duration: 0.8,
    repeat: -1,      // 계속 반복
    yoyo: true,      // 위 → 아래 왕복
    ease: 'sine.inOut',
    paused: true,    // section3 전까지 멈춤
  }
)

    const fireTl=gsap.timeline({
      scrollTrigger:{
        trigger:'.section3',
            start: 'top 70%',
            end: 'top 30%',
            scrub: 1,
            markers: false,
      }
    })
    fireTl.to(fireRef.current,{
      opacity:1,
      scaleY:1,
      duration:1,
      ease:'power2.Out',
      onComplete: () => {
  fireMove.play()
  floatMove.play()
},
onReverseComplete: () => {
  fireMove.pause()
  floatMove.pause()
},
    })
    .to(starRef.current, {
      opacity: 1,
      strokeDashoffset: 0,
      duration: 1,
      ease: 'power2.inOut',
    })
    .to(starRef.current, {
      fill: '#fffbae',
      duration: 0.5,
    })
.to(starSvgRef.current, {
  x: -180,
  y: -270,
  duration: 0.35,
  ease: 'none',
})
.to(starSvgRef.current, {
  x: -420,
  y: -420,
  duration: 0.35,
  ease: 'none',
})
.to(starSvgRef.current, {
  x: -660,
  y: -270,
  duration: 0.35,
  ease: 'none',
})
.to(starSvgRef.current, {
  x: -520,
  y: 0,
  duration: 0.35,
  ease: 'none',

  // 호 이동을 완료한 뒤 회전 시작
  onComplete: () => {
    starSpin.play()
  },

  // 스크롤을 반대로 올려서 이동 구간으로 돌아가면 회전 정지
  onReverseComplete: () => {
    starSpin.pause()
  },
})

    return ()=>{
      ctx.revert()
    }
  },[])


  const pstyle={
    fill: 'transparent',
    strokeWidth: '5',
    stroke: '#5250a5',
  }

  const secStyle={
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'end',
    alignItems: 'center',
    textAlign: 'center',
    boxSizing: 'border-box',
    flexDirection: 'column'
    
  }
  return (
    <main>
      <div style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '400px',
        zIndex: 10,
        pointerEvents: 'none',
        overflow: 'visible',
      }}>
       <svg ref={svgRef} id="Layer_2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 370.95 556.31" style={{ width: '100%', display: 'block', overflow: 'visible'}}>
       <g ref={rocketRef}>
       <defs>
        </defs>
            {/* 불 */}
            <g  ref={fireRef} id="Layer_3">
            <path style={{ fill: '#ff6c6c', stroke: '#5250a5', strokeMiterlimit: 10, strokeWidth: 5 }} d="M232.52,430.97c0,25.98-47.05,119.76-47.05,119.76,0,0-47.05-93.78-47.05-119.76s21.06-47.05,47.05-47.05,47.05,21.06,47.05,47.05Z"/>
            <path style={{ fill: '#fff1a1' }} d="M212.45,422.76c0,14.9-26.97,68.65-26.97,68.65,0,0-26.97-53.76-26.97-68.65s12.08-26.97,26.97-26.97,26.97,12.08,26.97,26.97Z"/>
            </g>
            {/* 날개들 */}
                <g id="_1">
                <polygon ref={leftWings} style={{ fill: '#fffbae', stroke: '#5250a5', strokeMiterlimit: 10, strokeWidth: 5 }} points="4.05 368.61 95.56 368.61 95.56 186.08 4.05 368.61"/>
                <polygon ref={rightWing} style={{ fill: '#fffbae', stroke: '#5250a5', strokeMiterlimit: 10, strokeWidth: 5 }} points="275.39 186.08 275.39 368.61 366.9 368.61 275.39 186.08"/>
                </g>
            <g id="_2" >
            {/* 몸체 */}
            <path ref={bodyRef} className='draw' style={{ fill: 'transparent', stroke: '#5250a5', strokeMiterlimit: 10, strokeWidth: 5 }} d="M203.7,13.02c-8.1-14.03-28.35-14.03-36.45,0l-71.69,124.17v231.42h179.82v-231.42L203.7,13.02Z"/>
            <circle ref={windowRef} className='draw' style={{ fill: 'transparent', stroke: '#5250a5', strokeMiterlimit: 10, strokeWidth: 5 }} cx="185.48" cy="162.24" r="38.73"/>
            </g>
            </g>
            </svg>

            {/* star */}
            <svg ref={starSvgRef} id="star" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 117.78 115.67" style={{ position: 'absolute', width: '100px', right: '-30px', top: '300px', overflow: 'visible' }}>
              <path ref={starRef} style={{ fill: 'transparent', stroke: '#e2b22b', strokeMiterlimit: 10, strokeWidth: 5 }} d="M59.73,5.06l14.98,27.56c.86,1.57,2.5,2.55,4.3,2.55h31.37c4.29,0,6.5,5.14,3.55,8.25l-21.58,22.76c-1.23,1.3-1.66,3.17-1.1,4.88l9.69,29.83c1.33,4.08-2.88,7.77-6.75,5.93l-28.32-13.49c-1.62-.77-3.53-.59-4.98.46l-25.38,18.44c-3.47,2.52-8.28-.33-7.72-4.59l4.08-31.1c.23-1.78-.52-3.54-1.97-4.59L4.52,53.5c-3.47-2.52-2.24-7.98,1.98-8.76l30.84-5.73c1.76-.33,3.2-1.59,3.76-3.3l9.69-29.83c1.33-4.08,6.9-4.6,8.95-.82Z" />
            </svg>
      </div>


      <section className='section1' style={{...secStyle, background: '#ffdce7', color:'#ff9bbb'}}>
        <h2 style={{marginBottom:'-30px'}}>step 01</h2>
        <h1 style={{fontSize:'50px'}}>Draw Rocket</h1>
        {/* <span>로켓이 내려오고 SVG가 그려집니다</span> */}
      </section>

      <section className='section2' style={{...secStyle, background: '#ffbad0', color:'#ffffff'}}>
        <h2 style={{marginBottom:'-30px'}}>step 02</h2>
        <h1 style={{fontSize:'50px'}}>Engine on</h1>
        {/* <span>엔진이 양 옆에 붙습니다</span> */}
      </section>

      <section className='section3' style={{...secStyle, background: '#ff9bbb', color:'#ffffff'}}>
        <h2 style={{marginBottom:'-30px'}}>step 03</h2>
        <h1 style={{fontSize:'50px'}}>Fly</h1>
        {/* <span>스크롤하면 불꽃이 나타남</span> */}
      </section>

    </main>
  )
}

export default App
