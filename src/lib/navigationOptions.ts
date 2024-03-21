import DashboardIcon from "@mui/icons-material/Dashboard";
import PaymentsIcon from "@mui/icons-material/Payments";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PersonIcon from '@mui/icons-material/Person';

interface AppNavigationOptions {
    key: string;
    title: string;
    icon: any;
    href?: string;
    fontawesomeIcon?: any;
}

const appNavigation: AppNavigationOptions[] = [
    {
        key: "marketplace",
        title: "Loan Market",
        href: "/marketplace",
        icon: QrCodeScannerIcon,
    },
    {
        key: "portfolio",
        title: "Portfolio",
        href: "/portfolio",
        icon: DashboardIcon,
    },
    {
        key: "lend",
        title: "Lender Portal",
        href: "/lend",
        icon: AccountBalanceIcon,
    },
    {
        key: "borrow",
        title: "Borrower Portal",
        href: "/borrow",
        icon: PaymentsIcon,
    },
    {
        key: "account",
        title: "My Account",
        href: "/account",
        icon: PersonIcon,
    },
];

export default appNavigation;
