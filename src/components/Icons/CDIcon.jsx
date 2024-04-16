import SvgIcon from "@mui/material/SvgIcon";

export default function CDIcon(props) {
  return (
    <SvgIcon {...props}>
      <path
        d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
        stroke="#101828"
        strokeWidth="1.5"
      />
      <path
        d="M6.5 12C6.5 8.9625 8.9625 6.5 12 6.5"
        stroke="#101828"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M12 14.5C13.3807 14.5 14.5 13.3807 14.5 12C14.5 10.6193 13.3807 9.5 12 9.5C10.6193 9.5 9.5 10.6193 9.5 12C9.5 13.3807 10.6193 14.5 12 14.5Z"
        stroke="#101828"
        strokeWidth="1.5"
      />
    </SvgIcon>
  );
}
