const Login = () => import("@/modules/login/");
const Register = () => import("@/modules/register/");
const Terms = () => import("@/modules/terms/");
const Account = () => import("@/modules/account/");
const Notifications = () => import("@/modules/notifications/");
const Home = () => import("@/modules/home/");
const Dashboard = () => import("@/modules/dashboard/");
const Clients = () => import("@/modules/clients/");
const ClientDetail = () => import("@/modules/clients/Detail");
const Contacts = () => import("@/modules/contacts/");
const ContactDetail = () => import("@/modules/contacts/Detail");
const Opportunities = () => import("@/modules/opportunities/");
const OpportunityDetail = () => import("@/modules/opportunities/Detail");
const OpportunityPhases = () => import("@/modules/opportunities/Phases");
const Activities = () => import("@/modules/activities/");
const Diary = () => import("@/modules/diary/");
const History = () => import("@/modules/history/");
const Users = () => import("@/modules/users/");
const RegisteredUsers = () => import("@/modules/users/RegisteredUsers");
const Company = () => import("@/modules/company/");
const Page404 = () => import("@/modules/Page404.vue");
const Page403 = () => import("@/modules/Page403.vue");
const Profiles = () => import("@/modules/profiles/");
const ProfilesDetail = () => import("@/modules/profiles/Detail");
// const About = () => import(/* webpackChunkName: "about" */ "@/modules/About");
// const Blank = () => import(/* webpackChunkName: "blank" */ "@/modules/Blank");

export default [
    {
        path: "/busqueda",
        name: "Busqueda",
        component: Login,
        meta: { auth: false }
    },
    // {
    //     path: "/register",
    //     name: "Register",
    //     component: Register,
    //     meta: { auth: false }
    // },
    {
        path: "/terms",
        name: "Terms",
        component: Terms,
        meta: { auth: false, public:true }
        
    },
    {
        path: "/account",
        name: "Account",
        component: Account,
        meta: { auth: true }
        
    },
    {
        path: "/notifications",
        name: "Notifications",
        component: Notifications,
        meta: { auth: true }
    },
    {
        path: "/",
        name: "Home",
        component: Home,
        meta: { auth: true }
    },
    {
        path: "/dashboard",
        name: "Dashboard",
        component: Dashboard,
        meta: { auth: true }
    },
    {
        path: "/clients",
        name: "Clients",
        component: Clients,
        meta: { auth: true }
    },
    {
        path: "/clients/:uuid",
        name: "ClientDetail",
        component: ClientDetail,
        meta: { auth: true }
    },
    {
        path: "/contacts",
        name: "Contacts",
        component: Contacts,
        meta: { auth: true }
    },
    {
        path: "/contacts/:uuid",
        name: "ContactDetail",
        component: ContactDetail,
        meta: { auth: true }
    },
    {
        path: "/opportunities",
        name: "Opportunities",
        component: Opportunities,
        meta: { auth: true }
    },
    {
        path: "/opportunities/:uuid",
        name: "OpportunityDetail",
        component: OpportunityDetail,
        meta: { auth: true }
    },
    {
        path: "/opportunity-phases",
        name: "OpportunityPhases",
        component: OpportunityPhases,
        meta: { auth: true }
    },
    {
        path: "/activities",
        name: "Activities",
        component: Activities,
        meta: { auth: true }
    },
    {
        path: "/diary",
        name: "Diary",
        component: Diary,
        meta: { auth: true }
    },
    {
        path: "/history",
        name: "History",
        component: History,
        meta: { auth: true }
    },
    {
        path: "/users",
        name: "Users",
        component: Users,
        meta: { auth: true }
    },
    {
        path: "/registered-users",
        name: "RegisteredUsers",
        component: RegisteredUsers,
        meta: { auth: true }
    },
    {
        path: "/company",
        name: "Company",
        component: Company,
        meta: { auth: true }
    },
    {
        path: "/profiles",
        name: "Perfiles",
        component: Profiles,
        meta: { auth: true }
    },
    {
        path: "/profiles/:uuid",
        name: "ProfileDetail",
        component: ProfilesDetail,
        meta: { auth: true , subroute:true, dependence: "/profiles" }
    },
    {
        path: "/404",
        name: "404",
        component: Page404
    },
    {
        path: "/403",
        name: "403",
        component: Page403
    },
    // {
    //     path: "/about",
    //     name: "About",
    //     component: About,
    // },
    // {
    //     path: "/blank",
    //     name: "BlankPage",
    //     component: Blank,
    //     meta: { layout: "BlankLayout" },
    // },
];
