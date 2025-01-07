const coachesData = [
    {
        img: "https://res.cloudinary.com/primap/image/upload/v1674812443/General/Dudi%20Sela/dudisela_pbrmv6.webp",
        video: "",
        embeddedVideo: "",
        name: 'דודי סלע',
        lastName: 'sela',
        title: 'מנהל ומאמן האקדמיה',
        description: 'לשעבר שחקן ATP טופ 30 עם ניסיון של מעל 10 שנים בטופ 100 העולמי. ' +
            'הוביל את נבחרת ישראל בגביע דייויס להופעה היסטורית בחצי הגמר בשנת 2009. ' +
            'השחקן השני המוביל בהיסטוריה של ה-ATP בתארים של אתגרי ATP. '
    },
    {
        img: 'https://res.cloudinary.com/primap/image/upload/v1674812442/General/Dudi%20Sela/yoavbenzvi_n3ywhn.webp',
        video: "",
        embeddedVideo: "",
        name: 'יואב בן צבי',
        lastName: 'ben-zvi',
        title: 'מנהל ומאמן האקדמיה',
        description: 'מאמן נבחרת ישראל. שחקן לאומי בכיר לשעבר עם ניסיון של מעל מ-15 שנה כמאמן מקצועי. ' +
            'המאמן הראשי של דודי סלע למעלה משבע שנים בתקופה שבה הדירוג של דודי היה 35 בעולם. ' +
            'היה מאמנה הראשי של שחקנית ה- WTA לשעבר שדורגה במקום ה -11, שחר פאר. '
    },
    {
        img: 'https://res.cloudinary.com/primap/image/upload/v1674812443/General/Dudi%20Sela/tomerzirkin_mdrfvs.webp',
        video: 'https://youtube.com/shorts/Jujbba2S_Xs',
        embeddedVideo: 'https://www.youtube.com/embed/Jujbba2S_Xs',
        name: 'תומר צירקין',
        lastName: 'zirkin',
        title: 'מאמן',
        description: 'מאמן טניס תחרותי באקדמיה בעל ניסיון של 6 שנים באימון ' +
            ' שחקן מקצועי לשעבר בנוער וקצת בבוגרים. ' +
            'אני מאמין שהערכים שקיבלתי במגרש ובבית אלה הערכים שאני מביא איתי למגרש ולשחקנים. כדי להגיע רחוק בטניס תחרותי צריך עקביות לאורך זמן, אמונה וסביבה תומכת '
    },
    {
        img: 'https://res.cloudinary.com/primap/image/upload/v1674812442/General/Dudi%20Sela/dorvertherimer_yhiteu.webp',
        video: "",
        embeddedVideo: "",
        name: 'דור ורטהיימר',
        lastName: 'werthaimer',
        title: 'מאמן',
        description: 'בן 37, אב לשניים, בעל תואר שני, שחקן מקצוען לשעבר ומאמן טניס עם נסיון של 15 שנים. '
    },
    {
        img: 'https://res.cloudinary.com/primap/image/upload/v1674812442/General/Dudi%20Sela/ronilior_nbrdrv.webp',
        video: "",
        name: 'רוני ליאור',
        lastName: 'lior',
        title: 'מאמנת',
        description: 'בת 21 מחיפה, הכרתי את הטניס בגיל 8, נמצאת בענף כבר 13 שנים. ' +
            'שחקנית טניס מקצועי לשעבר בנוער ובבוגרים. ' +
            'אני מאמינה בעבודה קשה, התמדה, סבלנות וסובלנות, יחס אישי לכל שחקן, השקעה ובעיקר להנות מכל רגע על המגרש '
    },
    {
        img: 'https://res.cloudinary.com/primap/image/upload/v1674812442/General/Dudi%20Sela/orasna_lmqbho.webp',
        name: 'אור אסנה',
        video: 'https://res.cloudinary.com/primap/video/upload/v1674812472/General/Dudi%20Sela/orasna_trux9o.mp4',
        embeddedVideo: 'https://www.youtube.com/embed/Uu4SWocUuD8',
        lastName: 'asana',
        title: 'מאמן',
        description: 'שחקן תחרותי לשעבר יוצא יחידה מובחרת ומאמן 7 שנים מתעסק בטניס לכל הרמות ולכל הגילאים ודוגל בעבודה קשה על המגרש. משפט שמוביל אותי מהיום הראשון שהתחלתי לאמן :"החינוך הוא הדרך, האדם הוא המטרה"'
    },
    {
        img: 'https://res.cloudinary.com/primap/image/upload/v1674812442/General/Dudi%20Sela/roeishafir_p5oool.webp',
        name: 'רועי שפיר',
        video: 'https://res.cloudinary.com/primap/video/upload/v1674812471/General/Dudi%20Sela/roeishafir_xrnimj.mp4',
        embeddedVideo: 'https://www.youtube.com/embed/D7abTe1hRVI',
        lastName: 'saphir',
        title: 'מאמן',
        description: 'בוגר מכללת וינגייט תעודת מאמן טניס ' +
            'שחקן מקצועי לשעבר בנוער וקצת בבוגרים. ' +
            'ספורטאי מצטיין בצבא כשחקן טניס פעיל. ' +
            'מאמן טניס כבר 17 שנה! ' +
            'עובד עם כל הגילאים וכל הרמות. ' +
            'אירגון של תחרויות טניס לחובבנים. '
    },
    {
        img: 'https://res.cloudinary.com/primap/image/upload/v1674812442/General/Dudi%20Sela/yonisipris_p3p8el.webp',
        video: "",
        embeddedVideo: "",
        name: 'יוני סיפריס',
        lastName: 'sipris',
        title: 'מאמן',
        description: 'משחק טניס מגיל 6 כולל טניס תחרותי בתחרויות בינלאומיות. ' +
            'מאמן עם ניסיון של מעל 10 שנים בכל הרמות. '
    },
    {
        img: 'https://res.cloudinary.com/primap/image/upload/v1677774044/General/Dudi%20Sela/WhatsApp_Image_2023-03-02_at_18.20.15_zerajn.jpg',
        video: "",
        embeddedVideo: "",
        name: 'דן ארוס',
        lastName: 'sipris',
        title: 'מאמן כושר',
        description: ''
    }
];

export default coachesData;