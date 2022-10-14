import './loader.css';

function Loader(): JSX.Element {
  return (
    <div className="spinner__block">
      <svg viewBox="0 0 39.688 39.688" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="a">
            <stop offset="0" stopColor="#004889" />
            <stop offset="1" stopColor="#004889" stopOpacity="0" />
          </linearGradient>
          <linearGradient
            id="b"
            gradientUnits="userSpaceOnUse"
            x1="39.76"
            x2="73.727"
            y1=".451"
            y2="27.625"
            xlinkHref="#a"
          />
        </defs>
        <path
          d="M75.357.18a75 75 0 00-75 75 75 75 0 0075 75 75 75 0 0075-75 75 75 0 00-75-75zm.35 5.472a70 70 0 0170 70 70 70 0 01-70 70 70 70 0 01-70-70 70 70 0 0170-70z"
          fill="url(#b)"
          strokeWidth="2.376"
          transform="scale(.26458)"
        />
      </svg>
    </div>
  );
}

export default Loader;
