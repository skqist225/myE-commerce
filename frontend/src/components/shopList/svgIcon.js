export const ProductIcon = ({ className }) => {
    return (
        <svg
            enableBackground="new 0 0 15 15"
            viewBox="0 0 15 15"
            x="0"
            y="0"
            strokeWidth="0"
            className={className}
        >
            <path d="m13 1.9c-.2-.5-.8-1-1.4-1h-8.4c-.6.1-1.2.5-1.4 1l-1.4 4.3c0 .8.3 1.6.9 2.1v4.8c0 .6.5 1 1.1 1h10.2c.6 0 1.1-.5 1.1-1v-4.6c.6-.4.9-1.2.9-2.3zm-11.4 3.4 1-3c .1-.2.4-.4.6-.4h8.3c.3 0 .5.2.6.4l1 3zm .6 3.5h.4c.7 0 1.4-.3 1.8-.8.4.5.9.8 1.5.8.7 0 1.3-.5 1.5-.8.2.3.8.8 1.5.8.6 0 1.1-.3 1.5-.8.4.5 1.1.8 1.7.8h.4v3.9c0 .1 0 .2-.1.3s-.2.1-.3.1h-9.5c-.1 0-.2 0-.3-.1s-.1-.2-.1-.3zm8.8-1.7h-1v .1s0 .3-.2.6c-.2.1-.5.2-.9.2-.3 0-.6-.1-.8-.3-.2-.3-.2-.6-.2-.6v-.1h-1v .1s0 .3-.2.5c-.2.3-.5.4-.8.4-1 0-1-.8-1-.8h-1c0 .8-.7.8-1.3.8s-1.1-1-1.2-1.7h12.1c0 .2-.1.9-.5 1.4-.2.2-.5.3-.8.3-1.2 0-1.2-.8-1.2-.9z"></path>
        </svg>
    );
};

export const FollowingIcon = ({ className }) => {
    return (
        <svg enableBackground="new 0 0 15 15" viewBox="0 0 15 15" x="0" y="0" className={className}>
            <g>
                <circle cx="7" cy="4.5" fill="none" r="3.8" strokeMiterlimit="10"></circle>
                <line
                    fill="none"
                    strokeLinecap="round"
                    strokeMiterlimit="10"
                    x1="12"
                    x2="12"
                    y1="11.2"
                    y2="14.2"
                ></line>
                <line
                    fill="none"
                    strokeLinecap="round"
                    strokeMiterlimit="10"
                    x1="10.5"
                    x2="13.5"
                    y1="12.8"
                    y2="12.8"
                ></line>
                <path
                    d="m1.5 13.8c0-3 2.5-5.5 5.5-5.5 1.5 0 2.9.6 3.9 1.6"
                    fill="none"
                    strokeLinecap="round"
                    strokeMiterlimit="10"
                ></path>
            </g>
        </svg>
    );
};

export const ChatIcon = ({ className }) => (
    <svg enableBackground="new 0 0 15 15" viewBox="0 0 15 15" x="0" y="0" className={className}>
        <g>
            <polygon
                fill="none"
                points="14 10.8 7 10.8 3 13.8 3 10.8 1 10.8 1 1.2 14 1.2"
                strokeLinejoin="round"
                strokeMiterlimit="10"
            ></polygon>
            <circle cx="4" cy="5.8" r="1" stroke="none"></circle>
            <circle cx="7.5" cy="5.8" r="1" stroke="none"></circle>
            <circle cx="11" cy="5.8" r="1" stroke="none"></circle>
        </g>
    </svg>
);

export const FollowerIcon = ({ className }) => {
    return (
        <svg enableBackground="new 0 0 15 15" viewBox="0 0 15 15" x="0" y="0" className={className}>
            <g>
                <circle cx="5.5" cy="5" fill="none" r="4" strokeMiterlimit="10"></circle>
                <path
                    d="m8.4 7.5c.7 0 1.1.7 1.1 1.6v4.9h-8v-4.9c0-.9.4-1.6 1.1-1.6"
                    fill="none"
                    strokeLinejoin="round"
                    strokeMiterlimit="10"
                ></path>
                <path
                    d="m12.6 6.9c.7 0 .9.6.9 1.2v5.7h-2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeMiterlimit="10"
                ></path>
                <path
                    d="m9.5 1.2c1.9 0 3.5 1.6 3.5 3.5 0 1.4-.9 2.7-2.1 3.2"
                    fill="none"
                    strokeLinecap="round"
                    strokeMiterlimit="10"
                ></path>
            </g>
        </svg>
    );
};

export const StarIcon = ({ className }) => (
    <svg enableBackground="new 0 0 15 15" viewBox="0 0 15 15" x="0" y="0" className={className}>
        <polygon
            fill="none"
            points="7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
        ></polygon>
    </svg>
);

export const JoinIcon = ({ className }) => (
    <svg enableBackground="new 0 0 15 15" viewBox="0 0 15 15" x="0" y="0" className={className}>
        <g>
            <circle cx="6.8" cy="4.2" fill="none" r="3.8" strokeMiterlimit="10"></circle>
            <polyline
                fill="none"
                points="9.2 12.5 11.2 14.5 14.2 11"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit="10"
            ></polyline>
            <path
                d="m .8 14c0-3.3 2.7-6 6-6 2.1 0 3.9 1 5 2.6"
                fill="none"
                strokeLinecap="round"
                strokeMiterlimit="10"
            ></path>
        </g>
    </svg>
);

export const AddIcon = ({ className }) => (
    <svg enableBackground="new 0 0 10 10" viewBox="0 0 10 10" x="0" y="0" className={className}>
        <polygon points="10 4.5 5.5 4.5 5.5 0 4.5 0 4.5 4.5 0 4.5 0 5.5 4.5 5.5 4.5 10 5.5 10 5.5 5.5 10 5.5"></polygon>
    </svg>
);

export const ChatIcon2 = ({ className }) => (
    <svg viewBox="0 0 16 16" className={className}>
        <g fillRule="evenodd">
            <path d="M15 4a1 1 0 01.993.883L16 5v9.932a.5.5 0 01-.82.385l-2.061-1.718-8.199.001a1 1 0 01-.98-.8l-.016-.117-.108-1.284 8.058.001a2 2 0 001.976-1.692l.018-.155L14.293 4H15zm-2.48-4a1 1 0 011 1l-.003.077-.646 8.4a1 1 0 01-.997.923l-8.994-.001-2.06 1.718a.5.5 0 01-.233.108l-.087.007a.5.5 0 01-.492-.41L0 11.732V1a1 1 0 011-1h11.52zM3.646 4.246a.5.5 0 000 .708c.305.304.694.526 1.146.682A4.936 4.936 0 006.4 5.9c.464 0 1.02-.062 1.608-.264.452-.156.841-.378 1.146-.682a.5.5 0 10-.708-.708c-.185.186-.445.335-.764.444a4.004 4.004 0 01-2.564 0c-.319-.11-.579-.258-.764-.444a.5.5 0 00-.708 0z"></path>
        </g>
    </svg>
);

export const BackIcon = ({ className }) => (
    <svg enableBackground="new 0 0 11 11" viewBox="0 0 11 11" x="0" y="0" className={className}>
        <g>
            <path d="m8.5 11c-.1 0-.2 0-.3-.1l-6-5c-.1-.1-.2-.3-.2-.4s.1-.3.2-.4l6-5c .2-.2.5-.1.7.1s.1.5-.1.7l-5.5 4.6 5.5 4.6c.2.2.2.5.1.7-.1.1-.3.2-.4.2z"></path>
        </g>
    </svg>
);

export const ArrowLeft = ({ className }) => (
    <svg viewBox="0 0 7 11" className={className}>
        <path
            d="M4.694078 9.8185598L.2870824 5.4331785c-.1957415-.1947815-.1965198-.511363-.0017382-.7071046a.50867033.50867033 0 0 1 .000868-.0008702L4.7381375.2732784 4.73885.273991c.1411545-.127878.3284279-.205779.5338961-.205779.4393237 0 .7954659.3561422.7954659.7954659 0 .2054682-.077901.3927416-.205779.5338961l.0006632.0006632-.0226101.0226101a.80174653.80174653 0 0 1-.0105706.0105706L2.4680138 4.7933195c-.1562097.1562097-.1562097.4094757 0 .5656855a.45579485.45579485 0 0 0 .0006962.0006944l3.3930018 3.3763607-.0009482.0009529c.128869.1413647.2074484.3293723.2074484.5357331 0 .4393237-.3561422.7954659-.7954659.7954659-.2049545 0-.391805-.077512-.5328365-.2048207l-.0003877.0003896-.0097205-.0096728a.80042023.80042023 0 0 1-.0357234-.0355483z"
            fillRule="nonzero"
        ></path>
    </svg>
);

export const ArrowRight = ({ className }) => (
    <svg viewBox="0 0 7 11" className={className}>
        <path
            d="M2.305922 9.81856l4.4069956-4.385381c.1957415-.194782.1965198-.511364.0017382-.707105a.26384055.26384055 0 0 0-.000868-.00087L2.2618625.273278 2.26115.273991C2.1199955.146113 1.9327221.068212 1.7272539.068212c-.4393237 0-.7954659.356142-.7954659.795466 0 .205468.077901.392741.205779.533896l-.0006632.000663.0226101.02261c.0034906.003557.0070143.00708.0105706.010571L4.5319862 4.79332c.1562097.156209.1562097.409475 0 .565685-.0002318.000232-.0004639.000463-.0006962.000694L1.1382882 8.73606l.0009482.000953c-.128869.141365-.2074484.329372-.2074484.535733 0 .439324.3561422.795466.7954659.795466.2049545 0 .391805-.077512.5328365-.204821l.0003877.00039.0097205-.009673c.012278-.011471.0241922-.023327.0357234-.035548z"
            fillRule="nonzero"
        ></path>
    </svg>
);

export const DropDownIcon = ({ className }) => (
    <svg viewBox="0 0 10 6" className={className}>
        <path
            d="M9.7503478 1.37413402L5.3649665 5.78112957c-.1947815.19574157-.511363.19651982-.7071046.00173827a.50153763.50153763 0 0 1-.0008702-.00086807L.2050664 1.33007451l.0007126-.00071253C.077901 1.18820749 0 1.0009341 0 .79546595 0 .35614224.3561422 0 .7954659 0c.2054682 0 .3927416.07790103.5338961.20577896l.0006632-.00066318.0226101.02261012a.80128317.80128317 0 0 1 .0105706.0105706l3.3619016 3.36190165c.1562097.15620972.4094757.15620972.5656855 0a.42598723.42598723 0 0 0 .0006944-.00069616L8.6678481.20650022l.0009529.0009482C8.8101657.07857935 8.9981733 0 9.2045341 0 9.6438578 0 10 .35614224 10 .79546595c0 .20495443-.077512.39180497-.2048207.53283641l.0003896.00038772-.0096728.00972053a.80044712.80044712 0 0 1-.0355483.03572341z"
            fillRule="nonzero"
        ></path>
    </svg>
);

export const SelectedDropDownIcon = ({ className }) => (
    <svg enableBackground="new 0 0 12 12" viewBox="0 0 12 12" x="0" y="0" className={className}>
        <g>
            <path d="m5.2 10.9c-.2 0-.5-.1-.7-.2l-4.2-3.7c-.4-.4-.5-1-.1-1.4s1-.5 1.4-.1l3.4 3 5.1-7c .3-.4 1-.5 1.4-.2s.5 1 .2 1.4l-5.7 7.9c-.2.2-.4.4-.7.4 0-.1 0-.1-.1-.1z"></path>
        </g>
    </svg>
);

export const HeartIcon = ({ className }) => (
    <svg height="16" viewBox="0 0 16 16" width="16" version="1.1" className={className}>
        <path
            d="m7.251221 4.2145388c-.549143-.4552525-1.2488781-.7145388-1.951221-.7145388-1.5719593 0-2.8 1.2269253-2.8 2.7970027 0 .5878515.158291 1.1598348.483492 1.7618948.6414654 1.1875754 1.5644044 2.1358244 4.4829309 4.7799304l.5348542.4864596.5326254-.4807607c2.9306205-2.660747 3.8471674-3.6039919 4.486777-4.7931984.3223805-.5993922.4793205-1.1689848.4793205-1.7543257 0-1.5700774-1.2280407-2.7970027-2.8-2.7970027-.7029148 0-1.4032175.2597087-1.9497845.7133288l-.0367779.0309601c-.1203966.1029087-.2318185.2143106-.3329071.3329122l-.3805305.4464557-.3805305-.4464557c-.1010886-.1186016-.2125105-.2300035-.3301434-.3305672z"
            fill="none"
            stroke="#000"
            strokeOpacity=".54"
        ></path>
    </svg>
);

export const StarEmptyBodyIcon = ({ className }) => (
    <svg viewBox="0 0 30 30" className={className}>
        <defs>
            <linearGradient id="star__hollow" x1="50%" x2="50%" y1="0%" y2="99.0177926%">
                <stop offset="0%" stopColor="#FFD211"></stop>
                <stop offset="100%" stopColor="#FFAD27"></stop>
            </linearGradient>
        </defs>
        <path
            fill="none"
            fillRule="evenodd"
            stroke="url(#star__hollow)"
            strokeWidth="2"
            d="M23.226809 28.390899l-1.543364-9.5505903 6.600997-6.8291523-9.116272-1.4059447-4.01304-8.63019038-4.013041 8.63019038-9.116271 1.4059447 6.600997 6.8291523-1.543364 9.5505903 8.071679-4.5038874 8.071679 4.5038874z"
        ></path>
    </svg>
);
