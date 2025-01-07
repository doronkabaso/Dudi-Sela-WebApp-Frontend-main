import React from 'react'
import Swal from 'sweetalert2'

export const CoachesPreview = ({ coach }) => {
    const coachDescription = document.createElement("coach-description");
    coachDescription.innerText = `${coach.description}`

    const openCoachDetails = () => {
        Swal.fire({
            backdrop: 'rgba(0,0,0,0.8)',
            title: `<strong><u>${coach.name}</u></strong>`,
            html: `${coach.video !== '' ? (`<iframe width="419" height="746" src=${coach.embeddedVideo}
            frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`) : (`<img src=${coach.img} alt=${coach.name} />`)}`,
            content: coachDescription,
            footer: `<div className="flex-column align-center"><h4 style='text-align: center; font-weight: 400;>${coach.description}</h4>
            <a target="_blank" rel="noreferrer" style='background-color: #C9DB39;
            color: #1d1d1d;
            min-width: 30%;
            margin-block-start: rem(16px);
            margin: 0 auto;
            text-align: center;
            border: 1px solid transparent;
            border-radius: 4px;
            cursor: pointer;
            font-size: calc(0.8rem + 0.8vw);
            font-weight: 600;
            padding: rem(36px);
            transition: 70ms cubic-bezier(.75, 0, .25, 1);
            '>קבעו אימון אישי</a>
            </div>`,
            showCloseButton: true,
            focusConfirm: false,
            allowOutsideClick: true,
            allowEscapeKey: true,
            stopKeydownPropagation: true,
            showConfirmButton: false,
        })
    }

    // const handleMouseEnter = useCallback(() => {
    //     setHover(true)
    // }, [setHover])

    // const handleMouseLeave = useCallback(() => {
    //     setHover(false)
    // }, [setHover])

    // useEffect(() => {
    //     if (coach?.video === "") return;
    //     videoRef.current.addEventListener('play', handleMouseEnter);
    //     videoRef.current.removeEventListener('pause', handleMouseLeave);
    //     videoRef.current.volume = videoRef.volume;
    // }, [handleMouseEnter, handleMouseLeave, coach.video])

    // const renderMedia = () => {
    //     if (coach.video === "") {
    //         return (<figure><img alt={coach.title} src={coach.img} /></figure>);
    //     }
    //     if (coach.video !== "") {
    //         if (hover) {
    //             return (<figure><VideoPlayer
    //                 className="video"
    //                 src={coach.video}
    //                 autoPlay={true}
    //                 mute={false}
    //                 volume={true}
    //                 preload='auto'
    //                 loop={true}
    //                 maxHeight="100%"
    //                 maxWidth="100%"
    //             /></figure>)
    //         }
    //     }
    //     // return (<img alt={coach.title} src={coach.img} />);
    //     return (<figure><video src={coach.video} /></figure>);
    // }

    return (
        <li className="flex slide"
            role="button"
            onClick={() => openCoachDetails()}>
            <img src={coach.img} alt={coach.title}
                className={coach.lastName}
            />
            <figcaption>
                <p className="coach-legends flex-column">{coach.name}
                    <span>{coach.title}</span>
                </p>
            </figcaption>
        </li>
    )
}
