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
                <circle cx="7" cy="4.5" fill="none" r="3.8" stroke-miterlimit="10"></circle>
                <line
                    fill="none"
                    stroke-linecap="round"
                    stroke-miterlimit="10"
                    x1="12"
                    x2="12"
                    y1="11.2"
                    y2="14.2"
                ></line>
                <line
                    fill="none"
                    stroke-linecap="round"
                    stroke-miterlimit="10"
                    x1="10.5"
                    x2="13.5"
                    y1="12.8"
                    y2="12.8"
                ></line>
                <path
                    d="m1.5 13.8c0-3 2.5-5.5 5.5-5.5 1.5 0 2.9.6 3.9 1.6"
                    fill="none"
                    stroke-linecap="round"
                    stroke-miterlimit="10"
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
                stroke-linejoin="round"
                stroke-miterlimit="10"
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
                <circle cx="5.5" cy="5" fill="none" r="4" stroke-miterlimit="10"></circle>
                <path
                    d="m8.4 7.5c.7 0 1.1.7 1.1 1.6v4.9h-8v-4.9c0-.9.4-1.6 1.1-1.6"
                    fill="none"
                    stroke-linejoin="round"
                    stroke-miterlimit="10"
                ></path>
                <path
                    d="m12.6 6.9c.7 0 .9.6.9 1.2v5.7h-2"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-miterlimit="10"
                ></path>
                <path
                    d="m9.5 1.2c1.9 0 3.5 1.6 3.5 3.5 0 1.4-.9 2.7-2.1 3.2"
                    fill="none"
                    stroke-linecap="round"
                    stroke-miterlimit="10"
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
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-miterlimit="10"
        ></polygon>
    </svg>
);

export const JoinIcon = ({ className }) => (
    <svg enableBackground="new 0 0 15 15" viewBox="0 0 15 15" x="0" y="0" className={className}>
        <g>
            <circle cx="6.8" cy="4.2" fill="none" r="3.8" stroke-miterlimit="10"></circle>
            <polyline
                fill="none"
                points="9.2 12.5 11.2 14.5 14.2 11"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-miterlimit="10"
            ></polyline>
            <path
                d="m .8 14c0-3.3 2.7-6 6-6 2.1 0 3.9 1 5 2.6"
                fill="none"
                stroke-linecap="round"
                stroke-miterlimit="10"
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
        <g fill-rule="evenodd">
            <path d="M15 4a1 1 0 01.993.883L16 5v9.932a.5.5 0 01-.82.385l-2.061-1.718-8.199.001a1 1 0 01-.98-.8l-.016-.117-.108-1.284 8.058.001a2 2 0 001.976-1.692l.018-.155L14.293 4H15zm-2.48-4a1 1 0 011 1l-.003.077-.646 8.4a1 1 0 01-.997.923l-8.994-.001-2.06 1.718a.5.5 0 01-.233.108l-.087.007a.5.5 0 01-.492-.41L0 11.732V1a1 1 0 011-1h11.52zM3.646 4.246a.5.5 0 000 .708c.305.304.694.526 1.146.682A4.936 4.936 0 006.4 5.9c.464 0 1.02-.062 1.608-.264.452-.156.841-.378 1.146-.682a.5.5 0 10-.708-.708c-.185.186-.445.335-.764.444a4.004 4.004 0 01-2.564 0c-.319-.11-.579-.258-.764-.444a.5.5 0 00-.708 0z"></path>
        </g>
    </svg>
);
