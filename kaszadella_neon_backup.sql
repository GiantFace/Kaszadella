--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5
-- Dumped by pg_dump version 17.5 (Debian 17.5-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: drizzle; Type: SCHEMA; Schema: -; Owner: neondb_owner
--

CREATE SCHEMA drizzle;


ALTER SCHEMA drizzle OWNER TO neondb_owner;

--
-- Name: day; Type: TYPE; Schema: public; Owner: neondb_owner
--

CREATE TYPE public.day AS ENUM (
    'Hétfő',
    'Kedd',
    'Szerda',
    'CSütörtök',
    'Péntek',
    'Szombat',
    'Vasárnap'
);


ALTER TYPE public.day OWNER TO neondb_owner;

--
-- Name: package; Type: TYPE; Schema: public; Owner: neondb_owner
--

CREATE TYPE public.package AS ENUM (
    'START',
    'KASZA',
    'KASZADELLA'
);


ALTER TYPE public.package OWNER TO neondb_owner;

--
-- Name: period_status; Type: TYPE; Schema: public; Owner: neondb_owner
--

CREATE TYPE public.period_status AS ENUM (
    'Expired',
    'Active'
);


ALTER TYPE public.period_status OWNER TO neondb_owner;

--
-- Name: role; Type: TYPE; Schema: public; Owner: neondb_owner
--

CREATE TYPE public.role AS ENUM (
    'USER',
    'ADMIN'
);


ALTER TYPE public.role OWNER TO neondb_owner;

--
-- Name: status; Type: TYPE; Schema: public; Owner: neondb_owner
--

CREATE TYPE public.status AS ENUM (
    'Pending',
    'Approved',
    'Customer'
);


ALTER TYPE public.status OWNER TO neondb_owner;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: __drizzle_migrations; Type: TABLE; Schema: drizzle; Owner: neondb_owner
--

CREATE TABLE drizzle.__drizzle_migrations (
    id integer NOT NULL,
    hash text NOT NULL,
    created_at bigint
);


ALTER TABLE drizzle.__drizzle_migrations OWNER TO neondb_owner;

--
-- Name: __drizzle_migrations_id_seq; Type: SEQUENCE; Schema: drizzle; Owner: neondb_owner
--

CREATE SEQUENCE drizzle.__drizzle_migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE drizzle.__drizzle_migrations_id_seq OWNER TO neondb_owner;

--
-- Name: __drizzle_migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: drizzle; Owner: neondb_owner
--

ALTER SEQUENCE drizzle.__drizzle_migrations_id_seq OWNED BY drizzle.__drizzle_migrations.id;


--
-- Name: forgot_password_tokens; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.forgot_password_tokens (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    email text NOT NULL,
    token text NOT NULL,
    expires_at timestamp with time zone NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.forgot_password_tokens OWNER TO neondb_owner;

--
-- Name: rate_limits; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.rate_limits (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    identifier text NOT NULL,
    action text NOT NULL,
    count integer DEFAULT 1,
    reset_time timestamp with time zone NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.rate_limits OWNER TO neondb_owner;

--
-- Name: sessions; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.sessions (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid,
    session_data text,
    expires_at timestamp with time zone NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.sessions OWNER TO neondb_owner;

--
-- Name: temp_cache; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.temp_cache (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    key text NOT NULL,
    value text NOT NULL,
    expires_at timestamp with time zone NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.temp_cache OWNER TO neondb_owner;

--
-- Name: ticket_tips; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.ticket_tips (
    id uuid NOT NULL,
    date date NOT NULL,
    day_name character varying(20) NOT NULL,
    subscription character varying(50) NOT NULL,
    package character varying(50) NOT NULL,
    combination character varying(20) NOT NULL,
    slip_name character varying(100) NOT NULL,
    tip_name character varying(100) NOT NULL,
    tip_description character varying(255) NOT NULL,
    odds_value character varying(10) NOT NULL,
    sum_odds character varying(10) NOT NULL
);


ALTER TABLE public.ticket_tips OWNER TO neondb_owner;

--
-- Name: users; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.users (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    full_name character varying(255) NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    status public.status DEFAULT 'Pending'::public.status,
    role public.role DEFAULT 'USER'::public.role,
    package_id text NOT NULL,
    last_activity_date date DEFAULT now(),
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    subscription_start timestamp with time zone,
    subscription_end timestamp with time zone
);


ALTER TABLE public.users OWNER TO neondb_owner;

--
-- Name: weeklyTips; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public."weeklyTips" (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    package public.package NOT NULL,
    day public.day NOT NULL,
    tip text NOT NULL,
    total_odds numeric
);


ALTER TABLE public."weeklyTips" OWNER TO neondb_owner;

--
-- Name: __drizzle_migrations id; Type: DEFAULT; Schema: drizzle; Owner: neondb_owner
--

ALTER TABLE ONLY drizzle.__drizzle_migrations ALTER COLUMN id SET DEFAULT nextval('drizzle.__drizzle_migrations_id_seq'::regclass);


--
-- Data for Name: __drizzle_migrations; Type: TABLE DATA; Schema: drizzle; Owner: neondb_owner
--

COPY drizzle.__drizzle_migrations (id, hash, created_at) FROM stdin;
1	7e08d2b92e0ba37e5f25662dcc929a827745a211b68b8b58e4f120d768ded90b	1740938906065
2	2697dc7c9296853f1996e548d790338989464b148f36b6c54d59c79522cea1b2	1743171255281
\.


--
-- Data for Name: forgot_password_tokens; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.forgot_password_tokens (id, email, token, expires_at, created_at) FROM stdin;
86e91d19-4857-4afa-a145-68e28f41b0f3	edinakulcsar@edinakulcsar.com	23793fcb-4390-4946-b45a-e1744a71af23	2025-04-17 08:01:14.856+00	2025-04-15 08:01:15.521+00
4f7e8045-f030-46c2-971e-88c043d4d85f	eyh2pl@stud.uni-obuda.hu	fdf688e5-d606-4b43-abdb-4378dc3e00e9	2025-04-26 20:12:29.368+00	2025-04-24 20:12:29.798+00
6af8270c-23e5-40fc-abc8-93f66922a0d5	modroczky.ferenc@hok.uni-obuda.hu	799453c4-cee8-4ee3-9460-6f8c4689531f	2025-04-26 20:23:18.164+00	2025-04-24 20:23:18.592+00
9e1d992e-b2aa-4c49-9e6e-571caed4c451	nbeniamk@gmail.com	7572917f-d9de-47f0-8fc0-892e7d4eb2ae	2025-05-27 18:53:03.343+00	2025-05-25 18:53:04.029+00
\.


--
-- Data for Name: rate_limits; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.rate_limits (id, identifier, action, count, reset_time, created_at) FROM stdin;
\.


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.sessions (id, user_id, session_data, expires_at, created_at) FROM stdin;
\.


--
-- Data for Name: temp_cache; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.temp_cache (id, key, value, expires_at, created_at) FROM stdin;
\.


--
-- Data for Name: ticket_tips; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.ticket_tips (id, date, day_name, subscription, package, combination, slip_name, tip_name, tip_description, odds_value, sum_odds) FROM stdin;
871490ab-1a43-4e45-9093-b22624c8888e	2025-04-21	Hétfő	Start csomag	Közepes tipp	1.es kötés	_St_Köz_Egyéni_1	Proba	Proba	1.00	1.00
f0523a11-4183-4d96-a126-839e2a06bf1c	2025-04-25	Péntek	Start csomag	Duplázó	2-es kötés	_St_Dup_2_1	Nyíregyháza - DVSC	Igen (Mindkét csapat szerez gólt)	1.58	2.40
5f599f16-e178-4cf4-a8de-7ea08a6f8f8d	2025-04-25	Péntek	Start csomag	Duplázó	2-es kötés	_St_Dup_2_1	Paris SG - Nice	Igen (Mindkét csapat szerez gólt)	1.52	2.40
e7e57ed8-5475-41ef-9ed3-2c682f16e756	2025-04-25	Péntek	Start csomag	Duplázó	2-es kötés	20250425_St_Dup_2_7	Randers - Bröndby	Igen (Mindkét csapat szerez gólt)	1.52	2.02
1e1d51fa-e3b6-455f-a3d3-f47dd20b8dce	2025-04-25	Péntek	Start csomag	Duplázó	2-es kötés	20250425_St_Dup_2_7	Cambuur - Vitesse	Cambuur (1X2)	1.33	2.02
290129a7-cd2c-4aa8-8ebc-550b693b263d	2025-04-25	Péntek	Kasza csomag	Közepes tipp	2-es kötés	_Kas_Köz_2_1	Famaliaco - Braga	Igen (Mindkét csapat szerez gólt)	1.78	3.47
4a1756db-0054-4b97-b3f3-2870161cd59b	2025-04-25	Péntek	Kasza csomag	Közepes tipp	2-es kötés	_Kas_Köz_2_1	Urawa RD - Sanfrecce Hiroshima	Urawa RD (Döntetlennél a tét visszajár)	1.95	3.47
b7aa378e-7187-4d3d-a90e-2174c4498ce8	2025-04-25	Péntek	Kaszadella csomag	Közepes tipp	2-es kötés	_Kdl_Köz_2_1	Famaliaco - Braga	Igen (Mindkét csapat szerez gólt)	1.78	3.47
41c2dddd-b01c-4d8a-8b88-d24621c36f9f	2025-04-25	Péntek	Kaszadella csomag	Közepes tipp	2-es kötés	_Kdl_Köz_2_1	Urawa RD - Sanfrecce Hiroshima	Urawa RD (Döntetlennél a tét visszajár)	1.95	3.47
317da0b1-315c-4c6d-b793-1ae04e77fc9d	2025-04-25	Péntek	Kaszadella csomag	Duplázó	2-es kötés	A - szelvény	Nyíregyháza - DVSC	Igen (Mindkét csapat szerez gólt)	1.58	2.40
ac608495-09bb-4e74-b25a-c84007951c30	2025-04-25	Péntek	Kaszadella csomag	Duplázó	2-es kötés	A - szelvény	Paris SG - Nice	Igen (Mindkét csapat szerez gólt)	1.52	2.40
bc481110-ce57-4321-9bd5-da8ce7282839	2025-04-25	Péntek	Kaszadella csomag	Duplázó	2-es kötés	B - szelvény	Cambuur - Vitesse	Cambuur (1X2)	1.33	2.02
c47a4463-866c-4f6c-bb03-b789791164a0	2025-04-25	Péntek	Kaszadella csomag	Duplázó	2-es kötés	B - szelvény	Randers - Bröndby	Igen (Mindkét csapat szerez gólt)	1.52	2.02
62dfc7a2-e80a-4154-9212-dc73e368beee	2025-04-25	Péntek	Kasza csomag	Duplázó	2-es kötés	A - szelvény	Nyíregyháza - DVSC	Igen (Mindkét csapat szerez gólt)	1.58	2.40
0bb38a1b-f149-4f63-9692-16bd7c20f611	2025-04-25	Péntek	Kasza csomag	Duplázó	2-es kötés	A - szelvény	Paris SG - Nice	Igen (Mindkét csapat szerez gólt)	1.52	2.40
8229ef81-137b-4126-9905-42327e0b9d8d	2025-04-25	Péntek	Kasza csomag	Duplázó	2-es kötés	B - szelvény	Randers - Bröndby	Igen (Mindkét csapat szerez gólt)	1.52	2.02
ff47523b-48d3-4783-8d42-62196e5ee6c0	2025-04-25	Péntek	Kasza csomag	Duplázó	2-es kötés	B - szelvény	Cambuur - Vitesse	Cambuur (1X2)	1.33	2.02
85acac54-e31d-4c30-8b76-79093a08a3dd	2025-04-25	Péntek	Kaszadella csomag	Közepes tipp	3-as kötés	20250425_Kdl_Köz_2_10	Famaliacao - Braga	Igen (Mindkét csapat szerez gólt)	1.78	3.17
de7eebdd-43a3-435a-9b0a-51552b50c8d4	2025-04-25	Péntek	Kaszadella csomag	Közepes tipp	3-as kötés	20250425_Kdl_Köz_2_10	Rakow Czestochowa - Slask Wroclaw	Több, mint 0,5 (1. félidő - Gólszám 0,5)	1.33	3.17
e39fa39e-9322-4e01-a1e5-84c52e658e07	2025-04-25	Péntek	Kaszadella csomag	Közepes tipp	3-as kötés	20250425_Kdl_Köz_2_10	Real Madrid - Madrid CFF	Real Madrid (1. félidő - 1X2)	1.34	3.17
e4ca94b3-9449-4997-afbd-b8f11f0767db	2025-04-21	Hétfő	Start csomag	Közepes tipp	2-es kötés	_St_Köz_2_1	Próba - Alma	Alma (1x2)	2.00	4.00
c0db8705-5e24-4fd9-9ec2-b63e79c93eb1	2025-04-21	Hétfő	Start csomag	Közepes tipp	2-es kötés	_St_Köz_2_1	Körte - Szilva	Szilva (1x2)	2.00	4.00
ea7818ff-278b-4cab-8864-c97911180758	2025-04-25	Péntek	Start csomag	Közepes tipp	2-es kötés	_St_Köz_2_1_2	as sdf	asf	3.40	7.96
0537f3d9-b9b5-4d13-aeb0-7a0fb14d187e	2025-04-25	Péntek	Start csomag	Közepes tipp	2-es kötés	_St_Köz_2_1_2	23a sad	asf	2.34	7.96
00e14a4e-2ce0-4849-9714-281e98656bd8	2025-04-25	Péntek	Start csomag	Közepes tipp	2-es kötés	_St_Köz_2_1_2	a g 19:00	2sdf	3.43	7.65
bdd602df-c423-4f50-9391-db3eb75d66d2	2025-04-26	Szombat	Kaszadella csomag	Nagy tipp	3-as kötés	_Kdl_Nag_3_1_1	Kolbotn - Lyn	Igen (Mindkét csapat szerez gólt)	1.92	6.71
01c6f5e4-3349-4ba8-bee9-fa578bf7a665	2025-04-26	Szombat	Kaszadella csomag	Nagy tipp	3-as kötés	_Kdl_Nag_3_1_1	QPR - Burnley	Igen (Mindkét csapat szerez gólt)	1.92	6.71
5c6c8d16-552e-4e79-982a-74a40561dd39	2025-04-26	Szombat	Kaszadella csomag	Nagy tipp	3-as kötés	_Kdl_Nag_3_1_1	LNZ Cserkaszi - Krivbász	Több, mint 0,5 (2. félidő - Vendégcsapat - Gólszám 0,5)	1.82	6.71
6f46b9bd-3a70-4da9-9311-30ec45d98e5d	2025-04-26	Szombat	Kaszadella csomag	Közepes tipp	2-es kötés	_Kdl_Köz_2_1_2	Győr - Paks	Több, mint 1,5 (2.félidő - Gólszám 1,5)	1.66	4.03
8f51db95-ce26-4978-acf6-20d1b221f5f9	2025-04-26	Szombat	Kaszadella csomag	Közepes tipp	2-es kötés	_Kdl_Köz_2_1_2	Southampton - Fulham	12+ (Szögletek száma)	2.43	4.03
33407731-d77f-4498-a890-b83dd7231f74	2025-04-26	Szombat	Kaszadella csomag	Duplázó	2-es kötés	20250426_Kdl_Dup_2_4	Eibar - Espanyol	Eibar (Döntetlennél a tét visszajár)	1.54	2.43
b8b7aa9f-4836-4e19-b518-db9211839241	2025-04-26	Szombat	Kaszadella csomag	Duplázó	2-es kötés	20250426_Kdl_Dup_2_4	Barcelona - Real Madrid	Barcelona (1. félidő - Döntetlennél a tét visszajár)	1.58	2.43
4da95906-bcd7-4906-9af4-dd590cc4fb70	2025-04-26	Szombat	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Dup_2_1_4	Venezia - Milan	2-3 (Gólszám)	1.97	2.50
66b2eb78-8ec3-46d8-a648-c3dba4b9e727	2025-04-26	Szombat	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Dup_2_1_4	Strasbourg - St - Etienne	1-3 (Hazai csapat - Gólszámok)	1.27	2.50
7cbbc106-8704-44f4-8847-c9c4267fd7a8	2025-04-26	Szombat	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Dup_2_1_5	Estrela Amadroa - Port	Porto (1X2)	1.46	2.15
fd8344a8-35d8-404c-9cf9-ccf2f11c6024	2025-04-26	Szombat	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Dup_2_1_5	LASK - Austria Klagenfurt	LASK (1X2)	1.47	2.15
62304969-9aa5-45a7-8d32-c2669341bcf2	2025-04-26	Szombat	Kaszadella csomag	Nagy tipp	5 -ös kötés	_Kdl_Nag_Egyéni_1_6	Strasbourg - St - Etienne	Strasbourg (1X2)	1.47	6.80
b6f60e2b-a4df-473c-a9b8-7b13906c79bc	2025-04-26	Szombat	Kaszadella csomag	Nagy tipp	5 -ös kötés	_Kdl_Nag_Egyéni_1_6	Pau - Metz	Metz (1X2)	1.54	6.80
f6e752aa-91df-4532-820f-85cb581edfc8	2025-04-26	Szombat	Kaszadella csomag	Nagy tipp	5 -ös kötés	_Kdl_Nag_Egyéni_1_6	LASK - Austria Klagenfurt	LASK (1X2)	1.47	6.80
776f3293-d04b-4b4b-8fb9-e40809ce03d9	2025-04-26	Szombat	Kaszadella csomag	Nagy tipp	5 -ös kötés	_Kdl_Nag_Egyéni_1_6	Estrela Amadora - Porto	Porto (1X2)	1.46	6.80
d0bfc3a1-583e-4cd5-aa8d-42b2160fef41	2025-04-26	Szombat	Kaszadella csomag	Nagy tipp	5 -ös kötés	_Kdl_Nag_Egyéni_1_6	Wolverhampton - Leicester	Wolverhampton (1X2)	1.40	6.80
3f7c56ca-c57a-48a3-8dbe-61d2187c9052	2025-04-26	Szombat	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Dup_2_1_7	Wolverhampton - Leicester	Wolverhampton (1X2)	1.40	2.00
36097b23-5486-4ee7-a61c-4ad0ab36a348	2025-04-26	Szombat	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Dup_2_1_7	Barnsley - Shrewsbury	Barnsley (1X2)	1.43	2.00
2be2e495-d612-48ce-bc08-902d2d74ad98	2025-04-26	Szombat	Kaszadella csomag	Közepes tipp	2-es kötés	_Kdl_Köz_2_1_8	Barcelona - Real Madrid	Barcelona (Ki nyeri a kupát?)	1.60	2.78
8ce48583-b922-4347-b845-44550c39de13	2025-04-26	Szombat	Kaszadella csomag	Közepes tipp	2-es kötés	_Kdl_Köz_2_1_8	QPR - Burnley	Burnley (1X2)	1.74	2.78
0d1bda8c-4b10-430e-93dd-c79d62a6fcf3	2025-04-26	Szombat	Kaszadella csomag	Nagy tipp	5- ös kötés	_Kdl_Nag_Egyéni_1_9	Újpest - Diósgyőr	Újpest vagy Döntetlen (Kétesély)	1.24	6.17
7bd747ca-5947-4c34-b4b0-24f4ef3e7138	2025-04-26	Szombat	Kaszadella csomag	Nagy tipp	5- ös kötés	_Kdl_Nag_Egyéni_1_9	Chelsea -Everton	Chelsea -1,5 (Szöglet hendikep - 1,5)	1.45	6.17
ec625fab-1bc5-47e5-ba5b-7b0da6395ea7	2025-04-26	Szombat	Kaszadella csomag	Nagy tipp	5- ös kötés	_Kdl_Nag_Egyéni_1_9	Győr - Paks	Igen (Mindkét csapat szerez gólt)	1.38	6.17
1c7ef74a-6619-45af-bcde-52da22a0bdac	2025-04-21	Hétfő	Kaszadella csomag	duplázó	2-es kötés	_Kdl_Dup_2_1	Vejle - Silkeborg	Velje vagy Döntetlen (Kétesélyes)	1.56	2.11
98098257-8ae5-4a94-b0a0-cdf9343b44f9	2025-04-21	Hétfő	Kaszadella csomag	duplázó	2-es kötés	_Kdl_Dup_2_1	Sassoulo - Frosinone	Sassoulo (Döntetlennél a tét visszajár)	1.35	2.11
ca4d7581-49b6-435f-b464-96994fa31220	2025-04-21	Hétfő	Kaszadella csomag	Közepes tipp	2-es kötés	_Kdl_Köz_2_1	Portsmouth - Watford	2- 3 (Gólszám)	1.91	3.30
d4efa13e-a3a2-4cf8-bfc6-213fc0c122c3	2025-04-21	Hétfő	Kaszadella csomag	Közepes tipp	2-es kötés	_Kdl_Köz_2_1	Cardiff - Oxford Utd.	Cardiff (1X2)	1.73	3.30
25ac578a-be84-4af5-b6fb-42ae179f47bc	2025-04-21	Hétfő	Kaszadella csomag	Nagy tipp	3/4 kombináció (4x)	_Kdl_Nag_Egyéni_1	Moremabe - Salford City	Döntetlen (1X2)	3.25	48.52
14478bfd-c632-40e8-a9ee-6f87da779266	2025-04-21	Hétfő	Kaszadella csomag	Nagy tipp	3/4 kombináció (4x)	_Kdl_Nag_Egyéni_1	Barrow - Tranmere	Döntetetlen (1X2)	3.05	48.52
2071abf6-a34c-4cc7-b7ba-c405244061c1	2025-04-21	Hétfő	Kaszadella csomag	Nagy tipp	3/4 kombináció (4x)	_Kdl_Nag_Egyéni_1	Harrogate Town - Fleetwood	Fleetwood (1X2)	2.59	48.52
f8125e18-690d-4450-a253-d4819ff767f3	2025-04-21	Hétfő	Kaszadella csomag	Nagy tipp	3/4 kombináció (4x)	_Kdl_Nag_Egyéni_1	Chesterfield - Bradford	Bradford (Döntetlennél a tét visszajár)	1.89	48.52
fa82d9ee-7c79-44fa-99c7-0b543ba4fa8e	2025-04-22	Kedd	Kaszadella csomag	duplázó	2-es kötés	_Kdl_Dup_2_1	Manchester City - Aston Villa	Igen (Mindkét csapat szerez gólt)	1.47	2.21
dc067932-c8c7-4de1-8dda-404152454011	2025-04-22	Kedd	Kaszadella csomag	duplázó	2-es kötés	_Kdl_Dup_2_1	Paks - ZTE	Paks (Ki jut tovább?)	1.50	2.21
561160ab-8db3-4965-b7a8-e80f53c91e64	2025-04-22	Kedd	Kaszadella csomag	Nagy tipp	4-es kötés	_Kdl_Nag_4_1	Paks - ZTE	Paks (Ki jut tovább?)	1.50	6.53
74698796-aa03-44cb-8cc6-c161244a4d6a	2025-04-22	Kedd	Kaszadella csomag	Nagy tipp	4-es kötés	_Kdl_Nag_4_1	Manchester City - Aston Villa	Igen és több, mint 2,5 (Mindkét csapat szerez gólt + Gólszám 2,5)	1.71	6.53
c7a59f1a-d5a9-4917-9cf8-4f507ced37bb	2025-04-22	Kedd	Kaszadella csomag	Nagy tipp	4-es kötés	_Kdl_Nag_4_1	Konyaspor - Galtasaray	Galatasaray (Ki jut tovább?)	1.34	6.53
93e92efa-5a98-4178-ae20-6641b3da2a64	2025-04-22	Kedd	Kaszadella csomag	Nagy tipp	4-es kötés	_Kdl_Nag_4_1	Valencia - Espanyol	Igen (Mindkét csapat szerez gólt)	1.90	6.53
4c6ffe88-38d1-454f-bdfa-0061751c7530	2025-04-22	Kedd	Kaszadella csomag	duplázó	1-es kötés	_Kdl_Dup_Egyéni_1	Barcelona - Mallorca	Barcelona -3,5 (Szöglet hendikep -3,5)/ Több, mint 1,5 (Hazai csapat - gólszám 1,5)	2.01	2.01
bdb7983d-aae3-49b3-acdc-0eb480cf742f	2025-04-22	Kedd	Kaszadella csomag	Közepes tipp	2-es kötés	_Kdl_Köz_2_1	Nantes - Paris SG	Paris SG -1,5 (Szöglet hendikep 1,5)/ 2.félidőben (Melyik félidőben lesz több gól?)	2.83	2.83
83ea1b1b-2609-4369-a96d-8810ad4497aa	2025-04-22	Kedd	Kaszadella csomag	Közepes tipp	2-es kötés	_Kdl_Köz_2_1	AEK Larnaca - Omonia Nicosia	Igen (Mindkét csapat szerez gólt)	1.67	2.92
2978683f-2e70-4a5b-ac4d-adec3954c3db	2025-04-22	Kedd	Kaszadella csomag	Közepes tipp	2-es kötés	_Kdl_Köz_2_1	Stal Mielec - Gornik Zabrze	Gornik Zabrze (Döntetlennél tét visszajár)	1.75	2.92
9aca78c0-9e76-4bdb-8359-552dd03a7914	2025-04-23	Szerda	Start csomag	Duplázó	1-es kötés	_St_Dup_Egyéni_1	Arsenal - Crystal Palace	Arsenal -2,5 (Szöglet hendikep -2,5)/ Több, mint 0,5 (1. félidő - Büntetőlap- szám 0,5)	2.04	2.04
dfc1e46a-7645-495f-8ebb-085c24fd8991	2025-04-23	Szerda	Kasza csomag	Duplázó	1-es kötés	_Kas_Dup_Egyéni_1	Arsenal - Crystal Palace	Arsenal -2,5 (Szöglet hendikep -2,5)/ Több, mint 0,5 (1. félidő - Büntetőlap- szám 0,5)	2.04	2.04
e442d019-23e5-41fc-ad03-1c0bfed55c2e	2025-04-23	Szerda	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Dup_2_1	Arsenal - Crystal Palace	Arsenal -2,5 (Szöglet hendikep -2,5)/ Több, mint 0,5 (1. félidő - Büntetőlap- szám 0,5)	2.04	2.04
42eb42bb-90d6-4f62-816a-005320edf283	2025-04-23	Szerda	Kasza csomag	Közepes tipp	2-es kötés	20250423_Kas_Köz_2_5	Getafe - Real Madrid	Real Madrid +0,5 (Szöglet hendikep -0,5)	1.44	2.92
cc3541d7-2e0f-49ce-8ebe-6579043e6ac9	2025-04-23	Szerda	Kasza csomag	Közepes tipp	2-es kötés	20250423_Kas_Köz_2_5	Internazionale - Milan	Internazionale vagy Döntetlen (Kétesélyes)/ Internazionale -0,5 (Szöglet hendikep -0,5)	2.03	2.92
53c89160-ac4f-4094-bce5-a0874234f54c	2025-04-26	Szombat	Kaszadella csomag	Nagy tipp	5- ös kötés	_Kdl_Nag_Egyéni_1_9	Puskás Akadémia - Fehérvár	Hazai és több (1X2 + Gólszám 1,5)	1.87	6.17
a4d4b04a-eaf7-43e4-bfe4-b3bbf7efb287	2025-04-26	Szombat	Kaszadella csomag	Nagy tipp	5- ös kötés	_Kdl_Nag_Egyéni_1_9	Southampton - Fulham	Több, mint 0,5 (1. félidő - Büntetőlap - szám 0,5)	1.33	6.17
d6f74257-6690-4549-a482-065ef7c8866c	2025-04-26	Szombat	Kaszadella csomag	Közepes tipp	5 - ös kötés	_Kdl_Köz_Egyéni_1_10	Estrela Amadora - Porto	Több, mint 0,5 (Vendégcsapat - Gólszám 0,5)	1.14	3.03
d2d299e8-4c1c-42de-8237-8fea110c9034	2025-04-23	Szerda	Kaszadella csomag	Közepes tipp	2-es kötés	_Kdl_Köz_2_1	Internazionale - Milan	Internazionale vagy Döntetlen (Kétesélyes)/ Internazionale -0,5 (Szöglet hendikep -0,5)	2.03	2.92
c32880b0-8ecd-414a-bbad-ada8dba5319c	2025-04-23	Szerda	Kaszadella csomag	Közepes tipp	2-es kötés	_Kdl_Köz_2_1	Getafe - Real Madrid	Real Madrid +0,5 (Szöglet hendikep -0,5)	1.44	2.92
4d48a065-f054-4e14-a3d2-d86bef7be4f7	2025-04-23	Szerda	Start csomag	Duplázó	2-es kötés	20250423_St_Dup_2_7	FTC - MTK	FTC (Ki jut tovább?)	1.18	2.08
8cfdd08f-4810-48a3-a61b-6cba0e45bbf0	2025-04-23	Szerda	Start csomag	Duplázó	2-es kötés	20250423_St_Dup_2_7	BW Linz - Rapid Wien	Rapid Wien (1X2)	1.76	2.08
672006b4-c6cf-418c-bbf1-8faacf2ff18c	2025-04-23	Szerda	Kasza csomag	Duplázó	2-es kötés	_Kas_Dup_2_1	FTC - MTK	FTC (Ki jut tovább?)	1.18	2.08
63179888-1883-4bbf-8928-cb3c446dd85c	2025-04-23	Szerda	Kasza csomag	Duplázó	2-es kötés	_Kas_Dup_2_1	BW Linz - Rapid Wien	Rapid Wien (1X2)	1.76	2.08
81e53608-593c-4a14-af32-da5f6f8f9b19	2025-04-23	Szerda	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Dup_2_1	BW Linz - Rapid Wien	Rapid Wien (1X2)	1.76	2.08
331f470a-922c-4e54-a720-5dd54a51083b	2025-04-23	Szerda	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Dup_2_1	FTC - MTK	FTC (Ki jut tovább?)	1.18	2.08
e2dde567-1296-4801-9141-ad7584bc108f	2025-04-23	Szerda	Kaszadella csomag	Közepes tipp	4-es kötés	_Kdl_Köz_4_1	Getafe - Real Madrid	Több, mint 1,5 (Gólszám 1,5)	1.25	3.67
3ee6b5ec-6417-458b-8343-e5cb3a4a268e	2025-04-23	Szerda	Kaszadella csomag	Közepes tipp	4-es kötés	_Kdl_Köz_4_1	Genoa - Lazio	Lazio (Döntetlennél tét visszjár)	1.53	3.67
f40cec3e-3dec-4a0b-97bf-6b245a4e2a48	2025-04-23	Szerda	Kaszadella csomag	Közepes tipp	4-es kötés	_Kdl_Köz_4_1	Zilina - FC Kosice	Zilina (Döntetlennél tét visszajár)	1.38	3.67
a6aab8d1-ed5a-4660-bbdb-8ed34223f61b	2025-04-23	Szerda	Kaszadella csomag	Közepes tipp	4-es kötés	_Kdl_Köz_4_1	Hajduk Split - Istra	Hajduk Split (1X2)	1.39	3.67
3fffb394-803e-45ca-8188-2c9e1e74d9b9	2025-04-23	Szerda	Kaszadella csomag	Közepes tipp	2-es kötés	_Kdl_Köz_2_1	1	1	1.00	1.00
dbc4c5d9-4cf6-489c-b7cd-fa453c1b1be7	2025-04-23	Szerda	Start csomag	Közepes tipp	2-es kötés	_St_Köz_2_1	dfdfbsdfb	vfvdfbvdfb	1.44	1.44
6e917266-fee0-4c0b-a65f-004f9f8de9b4	2025-04-23	Szerda	Kaszadella csomag	Nagy tipp	3-as kötés	_Kdl_Nag_3_1	Rijeka - Osijek	Rijeka (1X2)	1.40	5.66
c68de56b-b065-476e-b129-6575be954f38	2025-04-23	Szerda	Kaszadella csomag	Nagy tipp	3-as kötés	_Kdl_Nag_3_1	HNK Gorica - Dinamo Zagreb	Igen (Mindkét csapat szerez gólt)	1.99	5.66
fa341ff4-1331-4fd7-9c42-2a7f0e5d5ac8	2025-04-23	Szerda	Kaszadella csomag	Nagy tipp	3-as kötés	_Kdl_Nag_3_1	Genoa - Lazio	Lazio (1X2)	2.03	5.66
b1f53910-95a3-472a-9e72-db37124c2618	2025-04-24	Csütörtök	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Dup_2_1	Stevenage - Birmingham	Döntetlen vagy Birmingham (Kétesélyes)	1.16	2.16
ef7df232-1f7b-4336-b685-43db85d30f3e	2025-04-24	Csütörtök	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Dup_2_1	Atl. Madrid - Rayo Vallecano	Atl Madrid -0,5 (Szöglet hendikep -0,5) / Több, mint 0,5 (1. félidő - büntetőlap-szám 0,5)	1.86	2.16
20eb2555-66cd-49fa-b929-6f30996c25cf	2025-04-24	Csütörtök	Kaszadella csomag	Közepes tipp	3-as kötés	_Kdl_Köz_3_1	GAIS - Brommapojkarna	GAIS (Döntetlennél tét visszajár)	1.51	4.70
9609fd80-1dd9-432e-aadd-52d4bf972331	2025-04-24	Csütörtök	Kaszadella csomag	Közepes tipp	3-as kötés	_Kdl_Köz_3_1	Osasuna - Sevilla	0 - 8 (Szögletek száma)	2.09	4.70
b8d87243-4924-4fe7-b0e5-738ed3c2deac	2025-04-24	Csütörtök	Kaszadella csomag	Közepes tipp	3-as kötés	_Kdl_Köz_3_1	Atl. Madrid - Rayo Vallecano	Több, mint 8,5 (Szögletszám 8,5)	1.49	4.70
929d2875-7a00-4040-ad66-565e6f08952b	2025-04-24	Csütörtök	Kaszadella csomag	Nagy tipp	2-es kötés	20250424_Kdl_Nag_2_5	Gamle Oslo - Sarpborg	Igen és több, mint 2,5 (Mindkét csapat szerez gólt + 2,5)	2.34	6.48
8b9f975d-ad36-43bc-b155-3e6f49303194	2025-04-24	Csütörtök	Kaszadella csomag	Nagy tipp	2-es kötés	20250424_Kdl_Nag_2_5	Norrköping - Göteborg	Hazai és kevesebb (1X2 + Gólszám 4,5)	2.77	6.48
dfd6bce9-f886-41cd-99da-11f661c36ad9	2025-04-24	Csütörtök	Kaszadella csomag	Közepes tipp	2-es kötés	_Kdl_Köz_2_1	Twente - PSV	PSV (1X2)	1.64	2.76
f6ff434a-76da-4901-8061-8d7369ca7f8d	2025-04-24	Csütörtök	Kaszadella csomag	Közepes tipp	2-es kötés	_Kdl_Köz_2_1	Osasuna - Sevilla	Több, mint 1,5 (Gólszám 1,5) / Több, mint 3,5 (Büntetőlap - szám 3,5)	1.68	2.76
8b8ca4fc-2c96-45b0-abd7-dd32e2251b7d	2025-04-24	Csütörtök	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Dup_2_12	Győr - MTK	Győr (Ki nyeri a a kupát?)	1.35	2.09
96ff527f-2a4b-4364-b37c-4ffa63d94f89	2025-04-24	Csütörtök	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Dup_2_12	Trabzonspor - Göztepe Izmír	Igen ( Mindkét csapat szerez gólt)	1.55	2.09
9cd2227d-41ea-4cc8-9a4c-423bb690ac7a	2025-04-24	Csütörtök	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Dup_2_112	Betis - Valladolid	Több, mint 2,5 (Gólszám 2,5) / Több, mint 1,5 (Büntetőlap-szám 1,5)	1.56	2.11
6c1a63be-742b-476c-8bdb-eba8c93a63cc	2025-04-24	Csütörtök	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Dup_2_112	Győr - MTK	Győr (Ki nyeri a kupát?)	1.35	2.11
d215c836-75cc-47d9-9b7a-dd5bb96e2e9b	2025-04-26	Szombat	Kaszadella csomag	Közepes tipp	5 - ös kötés	_Kdl_Köz_Egyéni_1_10	QPR - Burnley	Döntetlen vagy Burnley (Kétesély)	1.20	3.03
5dc458f0-aa60-4df8-b1b7-f1a672ed991c	2025-04-26	Szombat	Kaszadella csomag	Közepes tipp	5 - ös kötés	_Kdl_Köz_Egyéni_1_10	Rodez Aveyron - Paris FC	Döntetlen vagy Paris FC (Kétesély)	1.32	3.03
bc4371b9-5cae-4906-8f89-918d1a493a52	2025-04-26	Szombat	Kaszadella csomag	Közepes tipp	5 - ös kötés	_Kdl_Köz_Egyéni_1_10	LASK - Austria Klagenfurt	LASK vagy döntetlen (Kétesély)	1.15	3.03
c703bda4-1a69-4d9d-a045-10ddc186ef6c	2025-04-26	Szombat	Kaszadella csomag	Közepes tipp	5 - ös kötés	_Kdl_Köz_Egyéni_1_10	Puskás Akadémia - Fehérvár	Puskás Akadémia vagy Döntetlen (Kétesély) - 1-3 Hazai csapat - Gólszámok	1.46	3.03
534be9d9-196e-4248-84a7-34181ca3489f	2025-04-26	Szombat	Kaszadella csomag	Duplázó	1 - es kötés	_Kdl_Dup_Egyéni_1_11	Barcelona - Real Madrid	Igen (Mindkét csapat szerez gólt) - Barcelona 0,5 (Szöglet hendikep -0,5)	2.25	2.25
b8c79b2d-8e3b-4ecc-a2b0-82860f25eb18	2025-04-26	Szombat	Kaszadella csomag	Extra hétvégi	7 - es kötés	20250426_Kdl_Ext_7_16	Estrela - Amadora - Porto	Porto (1X2)	1.46	22.10
17872cb2-c693-4074-8b24-c160da6a5926	2025-04-26	Szombat	Kaszadella csomag	Extra hétvégi	7 - es kötés	20250426_Kdl_Ext_7_16	Frederica - Esbjerg	Frederica (1X2)	1.58	22.10
ebd7cb03-e994-41e1-8256-5c82a6e79dfc	2025-04-26	Szombat	Kaszadella csomag	Extra hétvégi	7 - es kötés	20250426_Kdl_Ext_7_16	Almere City - Go Ahead Eagles	Döntetlen vagy Go Ahead Eagles (Kétesély)	1.41	22.10
a2937c6a-259f-4f61-99de-1e4b9b995dd6	2025-04-26	Szombat	Kaszadella csomag	Extra hétvégi	7 - es kötés	20250426_Kdl_Ext_7_16	Chelsea - Everton	Igen (Mindkét csapat szerez gólt)	1.48	22.10
8f9e6b12-8294-40b3-b8ac-bfd29af124c3	2025-04-26	Szombat	Kaszadella csomag	Extra hétvégi	7 - es kötés	20250426_Kdl_Ext_7_16	Boavista - Sporting CP	Sporting CP (1.félidő. - 1X2)	1.50	22.10
d59d617e-0813-49cf-b95a-357ab76aeccd	2025-04-26	Szombat	Kaszadella csomag	Extra hétvégi	7 - es kötés	20250426_Kdl_Ext_7_16	Nottingham - Manchester City	Manchester City (Ki jut tovább?)	1.36	22.10
bf1363c4-e00b-4083-a4ee-5f757287759b	2025-04-26	Szombat	Kasza csomag	Duplázó	1 - es kötés	_Kas_Dup_Egyéni_1_13	Barcelona - Real Madrid	Igen (Mindkét csapat szerez gólt) - Barcelona 0,5 (Szöglet hendikep -0,5)	2.25	2.25
fb696919-fccf-48b3-b0c2-14a8d8bf08f6	2025-04-26	Szombat	Kasza csomag	Duplázó	2-es kötés	_Kas_Dup_2_1_14	Barnsley - Shrewsbury	Barnsley (1X2)	1.43	2.00
db8494da-0814-4d0b-bbdb-9eec2865ec10	2025-04-26	Szombat	Kasza csomag	Duplázó	2-es kötés	_Kas_Dup_2_1_14	Wolverhampton - Leicester	Wolverhampton (1X2)	1.40	2.00
708dc89b-c15b-4cdd-b3f5-1cd1b53068cb	2025-04-26	Szombat	Kasza csomag	Duplázó	2-es kötés	_Kas_Dup_2_1_15	Eibar - Espanyol	Eibar (Döntetlennél a tét visszajár)	1.54	2.43
085d47d5-31e2-4343-96fd-df3786f8cc66	2025-04-26	Szombat	Kasza csomag	Duplázó	2-es kötés	_Kas_Dup_2_1_15	Barcelona - Real Madrid	Barcelona (1. félidő - Döntetlennél a tét visszajár)	1.58	2.43
8b51b285-7986-43f6-998e-428f16412e7e	2025-04-26	Szombat	Kasza csomag	Közepes tipp	2-es kötés	_Kas_Köz_2_1_16	Győr - Paks	Több, mint 1,5 (2.félidő - Gólszám 1,5)	1.66	4.03
cbfed5f0-b6e7-4912-b3d4-70f7cfa83af0	2025-04-26	Szombat	Kasza csomag	Közepes tipp	2-es kötés	_Kas_Köz_2_1_16	Southampton - Fulham	12+ (Szögletek száma)	2.43	4.03
2b61e303-7627-43d9-ad75-ae94695ccf99	2025-04-26	Szombat	Start csomag	Közepes tipp	2-es kötés	_St_Köz_2_1_17	Barcelona - Real Madrid	Barcelona (Ki nyeri a kupát?)	1.60	2.78
2967255d-1edf-41ef-a4b3-3d55dc8eb3e8	2025-04-26	Szombat	Start csomag	Közepes tipp	2-es kötés	_St_Köz_2_1_17	QPR - Burnley	Burnley (1X2)	1.74	2.78
a92cd1e9-1a82-4a35-aad0-9bd1f468bcb1	2025-04-26	Szombat	Kasza csomag	Közepes tipp	5 - ös kötés	_Kas_Köz_Egyéni_1_18	Estrela Amadora - Porto	Több, mint 0,5 (Vendégcsapat - Gólszám 0,5)	1.14	3.03
fdae2191-a677-4477-b939-379bdb6d1129	2025-04-26	Szombat	Kasza csomag	Közepes tipp	5 - ös kötés	_Kas_Köz_Egyéni_1_18	QPR - Burnley	Döntetlen vagy Burnley (Kétesély)	1.20	3.03
4d1296d0-8ec2-4026-b03f-bedf4d64ee91	2025-04-26	Szombat	Kasza csomag	Közepes tipp	5 - ös kötés	_Kas_Köz_Egyéni_1_18	Rodez Aveyron - Paris FC	Döntetlen vagy Paris FC (Kétesély)	1.32	3.03
5a28b8af-ae55-4b89-bff3-ad902a3efa48	2025-04-26	Szombat	Kasza csomag	Közepes tipp	5 - ös kötés	_Kas_Köz_Egyéni_1_18	LASK - Austria Klagenfurt	LASK vagy döntetlen (Kétesély)	1.15	3.03
7e1f2072-2f73-428a-9a22-d07b4c21c005	2025-04-26	Szombat	Kasza csomag	Közepes tipp	5 - ös kötés	_Kas_Köz_Egyéni_1_18	Puskás Akadémia - Fehérvár	Puskás Akadémia vagy Döntetlen (Kétesély) - 1-3 Hazai csapat - Gólszámok	1.46	3.03
44136089-d149-46b9-ba4d-fdcbf3909ce6	2025-04-26	Szombat	Kasza csomag	Közepes tipp	2-es kötés	_Kas_Köz_2_1_1	Barcelona - Real Madrid	Barcelona (Ki nyeri a kupát?)	1.60	2.78
f95794ba-0a1f-4014-abf5-ffe8d6e2338d	2025-04-26	Szombat	Kasza csomag	Közepes tipp	2-es kötés	_Kas_Köz_2_1_1	QPR - Burnley	Burnley (1X2)	1.74	2.78
7d3345ed-ed4a-4802-b193-8779a8f535b9	2025-04-26	Szombat	Start csomag	Duplázó	2-es kötés	20250426_St_Dup_2_3	Eibar - Espanyol	Eibar (Döntetlennél a tét visszajár)	1.54	2.43
15a7bb86-a40b-4595-8156-8c793ed7bfd8	2025-04-26	Szombat	Start csomag	Duplázó	2-es kötés	20250426_St_Dup_2_3	Barcelona - Real Madrid	Barcelona (1. félidő - Döntetlennél a tét visszajár)	1.58	2.43
dccd5c16-c69d-4bfe-af6d-6269946e75d5	2025-04-26	Szombat	Start csomag	Duplázó	1-es kötés	20250426_St_Dup_Egyéni_4	Barcelona - Real Madrid	Igen (Mindkét csapat szerez gólt) - Barcelona 0,5 (Szöglet hendikep -0,5)	2.25	2.25
07ead2db-f159-4402-9da8-95f3db548afb	2025-04-26	Szombat	Start csomag	Duplázó	2-es kötés	_St_Dup_2_1_4	Barnsley - Shrewsbury	Barnsley (1X2)	1.43	2.00
fe1a88de-23b0-4f20-ac9a-5ce0eadb1ff7	2025-04-26	Szombat	Start csomag	Duplázó	2-es kötés	_St_Dup_2_1_4	Wolverhampton - Leicester	Wolverhampton (1X2)	1.40	2.00
bbbb1818-9173-4a3d-8685-9c56d7031e81	2025-04-26	Szombat	Kaszadella csomag	Extra hétvégi	7 - es kötés	20250426_Kdl_Ext_7_16	Barcelona - Real Madrid	Igen (Mindkét csapat szerez gólt) - Barcelona - 0,5, Szöglet hendikep - 0,5	2.25	22.10
f9d5df9a-28a1-4b8b-a933-1aef1e493b83	2025-04-27	Vasárnap	Kasza csomag	Duplázó	1-es kötés	20250427_Kas_Dup_1_3	Liverpool - Tottenham	Liverpool -2,5 (szöglet hendikep -2,5) / 1- 3 (hazai csapat - gólszámok)	2.22	2.22
7fa8851e-d5c7-4787-95ca-28fe4e4de545	2025-04-27	Vasárnap	Start csomag	Duplázó	2-es kötés	20250427_St_Dup_2_3	Liverpool - Tottenham	Liverpool -2,5 (szöglet hendikep -2,5) / 1- 3 (hazai csapat - gólszámok)	2.22	2.22
1693b004-4420-4a06-a578-b4f5a2a0def5	2025-04-27	Vasárnap	Kasza csomag	Közepes tipp	2-es kötés	_Kas_Köz_2_1_3	Vasas - Gyirmót	Vasas vagy Döntetlen (Kétesélyes)	1.14	2.66
a4b0ff2f-ce73-47d0-8747-66f531a13c35	2025-04-27	Vasárnap	Kasza csomag	Közepes tipp	2-es kötés	_Kas_Köz_2_1_3	Kisvárda - Szentlőrinc	Kisvárda vagy Döntetlen (Kétesélyes)	1.19	2.66
da803344-810e-4b6a-be84-b7e4bcc22dde	2025-04-27	Vasárnap	Kasza csomag	Közepes tipp	2-es kötés	_Kas_Köz_2_1_3	Birmingham - Mansfield	2- 3 (Gólszám)	1.96	2.66
e438e100-4c32-4187-a712-572e42d6a454	2025-04-27	Vasárnap	Kaszadella csomag	Duplázó	1-es kötés	_Kdl_Dup_Egyéni_1_1	Liverpool - Tottenham	Liverpool -2,5 (szöglet hendikep -2,5) / 1- 3 (hazai csapat - gólszámok)	2.22	2.22
98c27a6d-5a15-451d-86b1-1abb8c237b59	2025-04-27	Vasárnap	Kaszadella csomag	Duplázó	2-es kötés	20250427_Kdl_Dup_2_4	Chelsea - Barcelona	Igen (Mindkét csapat szerez gólt)	1.51	2.46
2db8aa4c-a9b8-4d22-8f25-dec2a9e97b23	2025-04-27	Vasárnap	Kaszadella csomag	Duplázó	2-es kötés	20250427_Kdl_Dup_2_4	Bournemouth - Manchester City	Igen (Mindkét csapat szerz gólt)	1.63	2.46
f67f769b-065e-4da3-b52b-b44ece34932d	2025-04-27	Vasárnap	Kaszadella csomag	Nagy tipp	4-es kötés	_Kdl_Nag_4_1_4	Nottingham - Manchester City	Manchester City (Ki jut tovább?)	1.36	5.42
73e360a2-500f-4ae2-8c08-b8defa0827c1	2025-04-27	Vasárnap	Kaszadella csomag	Nagy tipp	4-es kötés	_Kdl_Nag_4_1_4	Auckland FC - Perth Glory	Auckland FC (1.félidő - 1X2)	1.64	5.42
32aec27c-70fc-4631-b055-c298e0badf7b	2025-04-27	Vasárnap	Kaszadella csomag	Nagy tipp	4-es kötés	_Kdl_Nag_4_1_4	ZTE - Kecskemét	Igen (Mindkét csapat szerez gólt)	1.93	5.42
7a2d07a1-af3a-4b2e-a9b0-82f706ddc773	2025-04-27	Vasárnap	Kaszadella csomag	Nagy tipp	4-es kötés	_Kdl_Nag_4_1_4	MTK - FTC	1 - 3 (Vendégcsapat - gólszámok)	1.26	5.42
c068e039-1230-4ef3-ab08-9d6cb18c81e4	2025-04-27	Vasárnap	Kaszadella csomag	Közepes tipp	3-as kötés	20250427_Kdl_Köz_3_3	Vasas - Gyirmót	Vasad vagy Döntetlen (Kétesélyes)	1.14	2.66
098c4181-93f2-4749-9d08-3edb512ea0cb	2025-04-27	Vasárnap	Kaszadella csomag	Közepes tipp	3-as kötés	20250427_Kdl_Köz_3_3	Kisvárda - Szentlőrinc	Kisvárda vagy Döntetlen (Kétesélyes)	1.19	2.66
a996944e-9821-4994-b5b9-32b01eb1b0b7	2025-04-27	Vasárnap	Kaszadella csomag	Közepes tipp	3-as kötés	20250427_Kdl_Köz_3_3	Birmingham - Mansfield	2- 3 (Gólszám)	1.96	2.66
aeb701ea-0b20-4046-9a62-9684c4b06173	2025-04-27	Vasárnap	Start csomag	Duplázó	2-es kötés	_St_Dup_2_1_2	Korona Kielce - Jagiellonia Bialystok	Döntetlen vagy Jagiellonia Bialystok (Kétesélyes)	1.31	2.00
a8b6b1ec-ee57-40c1-ae81-4ad50289a12e	2025-04-27	Vasárnap	Start csomag	Duplázó	2-es kötés	_St_Dup_2_1_2	Qingdao Hainiu - Meizhou Hakka	Meizhou Hakka (Döntetlennél a tét visszajár)	1.53	2.00
670cdf79-fde4-4fac-85fd-64226dc5f721	2025-04-27	Vasárnap	Kasza csomag	Duplázó	2-es kötés	_Kas_Dup_2_1_3	MTK - FTC	FTC (1X2)	1.55	2.09
3d53b337-8180-447a-88db-a218d27f9568	2025-04-27	Vasárnap	Kasza csomag	Duplázó	2-es kötés	_Kas_Dup_2_1_3	Ajax - Sparta Rotterdam	Ajax (1X2)	1.35	2.09
2a487ff8-8d4d-459e-af00-a978b1ce9558	2025-04-27	Vasárnap	Start csomag	Duplázó	2-es kötés	_St_Dup_2_1_1	Ajax - Sparta Rotterdam	Ajax (1X2)	1.35	2.09
5be601db-1845-4d6f-a4e6-c8f816f1ba83	2025-04-27	Vasárnap	Start csomag	Duplázó	2-es kötés	20250427_St_Dup_2_5	AIK Stockholm - Elfsborg	AIK Stockholm (Döntetlennél a tét visszajár)	1.61	2.33
c5f91b5a-a8be-4fd2-b0c6-00257f5ea137	2025-04-27	Vasárnap	Start csomag	Duplázó	2-es kötés	20250427_St_Dup_2_5	Bodö/ Glimt - KFUM Oslo	Több, mint 2,5 (Gólszám 2,5)	1.45	2.33
9c28bcd1-3aed-492f-a5d8-e9649458d2c1	2025-04-27	Vasárnap	Start csomag	Közepes tipp	2-es kötés	_St_Köz_2_1_5	Almere City - GO Ahead Eagles	Go Ahead Eagles (Döntetlennél a tét visszajár)	1.82	2.88
836b58d2-677a-4a4d-aa9e-cc7cd95c1c2e	2025-04-27	Vasárnap	Start csomag	Közepes tipp	2-es kötés	_St_Köz_2_1_5	Fredericia - Esbjerg	Fredericia (1X2)	1.58	2.88
c4709a40-26c9-49db-a3bf-2eb97a379d5e	2025-04-27	Vasárnap	Kasza csomag	Közepes tipp	2-es kötés	_Kas_Köz_2_1_6	Fredericia - Esbjerg	Fredericia (1X2)	1.58	2.88
4744404e-792d-4fe1-b47e-818102dc5669	2025-04-27	Vasárnap	Kasza csomag	Közepes tipp	2-es kötés	_Kas_Köz_2_1_6	Almere City - GO Ahead Eagles	Go Ahead Eagles (Döntetlennél a tét visszajár)	1.82	2.88
0f36ff41-9478-4b80-92d1-83b49b031e65	2025-04-27	Vasárnap	Kasza csomag	Közepes tipp	3-as kötés	_Kas_Köz_3_1_7	Sönderjyske - Viborg	Kevesebb, mint 3,5 (Gólszám 3,5)	1.47	3.94
c98547a2-0ceb-4f6b-bd00-8e02efef9f6f	2025-04-27	Vasárnap	Kasza csomag	Közepes tipp	3-as kötés	_Kas_Köz_3_1_7	Portimonense - Tondela	Portimonense vagy Döntetlen (1. félidő - kétesélyes)	1.34	3.94
3b61f7e4-76b5-4385-85b0-4e28f2188db4	2025-04-27	Vasárnap	Kasza csomag	Közepes tipp	3-as kötés	_Kas_Köz_3_1_7	MTK - FTC	Igen ( Alexander Pesic kezdőként szerez gólt?)	2.00	3.94
e1c8f5bb-8ad1-41c4-9781-6d59866f78be	2025-04-27	Vasárnap	Kasza csomag	Nagy tipp	3-as kötés	_Kas_Nag_3_1_8	Arhus GF - FC Köbenhavn	Igen (Mindkét csapat szerez gólt)	1.83	5.07
71251c7d-b9e7-442e-8a72-6876886f6baa	2025-04-27	Vasárnap	Kasza csomag	Nagy tipp	3-as kötés	_Kas_Nag_3_1_8	Afta - Koper	Igen (Mindkét csapat szerez gólt)	1.72	5.07
e7491f24-4370-4e51-9e06-f9b7bed7ec60	2025-04-27	Vasárnap	Kasza csomag	Nagy tipp	3-as kötés	_Kas_Nag_3_1_8	Marseille - Brest	Igen (Mindkét csapat szerez gólt)	1.61	5.07
d90555aa-b5ad-4dec-b662-ee15aaeff4ca	2025-04-27	Vasárnap	Kaszadella csomag	Nagy tipp	3-as kötés	_Kdl_Nag_3_1_1	Arhus GF - FC Köbenhavn	Igen (Mindkét csapat szerez gólt)	1.83	5.07
23757cb7-c90c-4a8f-935b-53e267cc991c	2025-04-27	Vasárnap	Kaszadella csomag	Nagy tipp	3-as kötés	_Kdl_Nag_3_1_1	Afta - Koper	Igen (Mindkét csapat szerez gólt)	1.72	5.07
58815d1e-5249-4a22-a2f8-125455de1938	2025-04-27	Vasárnap	Kaszadella csomag	Nagy tipp	3-as kötés	_Kdl_Nag_3_1_1	Marseille - Brest	Igen (Mindkét csapat szerez gólt)	1.61	5.07
7299d43f-38fd-4d5f-99c7-b4ba33acc18f	2025-04-27	Vasárnap	Kaszadella csomag	Közepes tipp	2-es kötés	_Kdl_Köz_2_1_2	Almere City - GO Ahead Eagles	Go Ahead Eagles (Döntetlennél a tét visszajár)	1.82	2.88
27a21596-03ce-480d-b846-e4deafd94e19	2025-04-27	Vasárnap	Kaszadella csomag	Közepes tipp	2-es kötés	_Kdl_Köz_2_1_2	Fredericia - Esbjerg	Fredericia (1X2)	1.58	2.88
712e21f5-a7b9-4965-bc5f-bd9d22484baa	2025-04-27	Vasárnap	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Dup_2_1_4	Catanzaro - Palermo	Igen (Mindkét csapat szerez gólt)	1.63	2.20
8bd8c8aa-4c7f-4f4d-9477-c7303e9844b8	2025-04-27	Vasárnap	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Dup_2_1_4	Maccabi Netanya - Hapoel Beer Sheva	(1X2)	1.35	2.20
99cdc22e-e53c-41cb-a760-5ccc11af9cbb	2025-04-27	Vasárnap	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Dup_2_1_5	Korona Kielce - Jagiellonia Bialystok	Döntetlen vagy Jagiellonia Bialystok (Kétesélyes)	1.31	2.00
b35e86cd-7f35-4804-ab5e-b259d2227106	2025-04-27	Vasárnap	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Dup_2_1_5	Qingdao Hainiu - Meizhou Hakka	Meizhou Hakka (Döntetlennél a tét visszajár)	1.53	2.00
f9a11d61-637b-45ae-b0aa-bf8f7fbd4330	2025-04-27	Vasárnap	Kaszadella csomag	Nagy tipp	3-as kötés	_Kdl_Nag_3_1_6	Sönderjyske - Viborg	Kevesebb, mint 3,5 (Gólszám 3,5)	1.47	5.10
9887cedf-a704-4309-bfad-9a793dbb569d	2025-04-27	Vasárnap	Kaszadella csomag	Nagy tipp	3-as kötés	_Kdl_Nag_3_1_6	Bournemouth - Manchester Utd.	Több, mint 4,5 (Vendégcsapat szögletszám 4,5)	1.77	5.10
4b011ffe-4b50-4898-adad-6c2554c60751	2025-04-27	Vasárnap	Kaszadella csomag	Nagy tipp	3-as kötés	_Kdl_Nag_3_1_6	Rapid Wien - BW Linz	2 - 3 (Gólszám)	1.96	5.10
364bd53d-d855-4ec4-b434-9eab8abedcfc	2025-04-27	Vasárnap	Kaszadella csomag	Közepes tipp	3-as kötés	_Kdl_Köz_3_1_7	Sönderjyske - Viborg	Kevesebb, mint 3,5 (Gólszám 3,5)	1.47	3.94
60d9414f-e38e-479e-8daf-538fa1c2e119	2025-04-27	Vasárnap	Kaszadella csomag	Közepes tipp	3-as kötés	_Kdl_Köz_3_1_7	Portimonense - Tondela	Portimonense vagy Döntetlen (1. félidő - kétesélyes)	1.34	3.94
ce9f7cab-edb7-46be-a21e-c2e36db13c2d	2025-04-27	Vasárnap	Kaszadella csomag	Közepes tipp	3-as kötés	_Kdl_Köz_3_1_7	MTK - FTC	Igen ( Alexander Pesic kezdőként szerez gólt?)	2.00	3.94
c3ac7ffc-7b14-431f-ab89-74a8030aa713	2025-04-27	Vasárnap	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Dup_2_1_8	AIK Stockholm - Elfsborg	AIK Stockholm (Döntetlennél a tét visszajár)	1.61	2.33
5da58a5a-0b25-4cff-90e7-500542852519	2025-04-27	Vasárnap	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Dup_2_1_8	Bodö/ Glimt - KFUM Oslo	Több, mint 2,5 (Gólszám 2,5)	1.45	2.33
f61c0e55-d30b-44f8-bf07-4c5d1fcbb693	2025-04-27	Vasárnap	Start csomag	Duplázó	2-es kötés	_St_Dup_2_1_1	MTK - FTC	FTC (1X2)	1.55	2.09
86bae11f-2a9d-44a0-9963-33e629962cc8	2025-04-27	Vasárnap	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Dup_2_1_3	MTK - FTC	FTC (1X2)	1.55	2.09
e9be1c09-56f7-4107-a2ce-5c018444711e	2025-04-27	Vasárnap	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Dup_2_1_3	Ajax - Sparta Rotterdam	Ajax (1X2)	1.35	2.09
a35d2be4-c341-4060-892e-9b0e5892045a	2025-04-28	Hétfő	Start csomag	Duplázó	2-es kötés	_St_Dup_2_1_1	U19Trabzonspor - U19Barcelona	18:00 - Igen (Mindkét csapat szerez gólt)	1.80	2.05
c7c0bf41-3b0e-458e-b2f9-3b30610f784f	2025-04-28	Hétfő	Start csomag	Duplázó	2-es kötés	_St_Dup_2_1_1	Leeds - Bristol	21:00 - Kevesebb, mint 4,5 (Gólszám 4,5)	1.14	2.05
3ab20112-fb2c-4c6b-b016-11e3c945d2ef	2025-04-28	Hétfő	Kasza csomag	Duplázó	2-es kötés	_Kas_Dup_2_1_2	U19Trabzonspor - U19Barcelona	18:00 - Igen (Mindkét csapat szerez gólt)	1.80	2.05
847237c0-d5df-4eea-9422-d159898d004f	2025-04-28	Hétfő	Kasza csomag	Duplázó	2-es kötés	_Kas_Dup_2_1_2	Leeds - Bristol	21:00 - Kevesebb, mint 4,5 (Gólszám 4,5)	1.14	2.05
6da2d7f0-8e5e-4921-8e9f-53407bad4e42	2025-04-28	Hétfő	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Dup_2_1_3	Leeds - Bristol	21:00 - Kevesebb, mint 4,5 (Gólszám 4,5)	1.14	2.05
070839d4-7061-443c-b753-e4b930c94d03	2025-04-28	Hétfő	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Dup_2_1_3	U19Trabzonspor - U19Barcelona	18:00 - Igen (Mindkét csapat szerez gólt)	1.80	2.05
4a2ba7ae-74d4-4174-8da2-7ad7e2692bf1	2025-04-28	Hétfő	Kasza csomag	Közepes tipp	2-es kötés	_Kas_Köz_2_1_4	Almería - Ferrol	20:30 - Több, mint 1,5 (Hazai csapat - Gólszám 1,5)	1.41	2.64
d024c9ab-50f3-4f0d-a5a0-b7ab9f57d117	2025-04-28	Hétfő	Kasza csomag	Közepes tipp	2-es kötés	_Kas_Köz_2_1_4	Utrecht 2 - Volendam	20:00 - Volendam (1.félidő - 1X2)	1.87	2.64
ed23fc43-f9cb-46b2-97e9-1dda13a61039	2025-04-28	Hétfő	Kaszadella csomag	Közepes tipp	2-es kötés	_Kdl_Köz_2_1_5	Utrecht 2 - Volendam	20:00 - Volendam (1.félidő - 1X2)	1.87	2.64
f1abc4fd-8778-4eb6-a8aa-79f41a847946	2025-04-28	Hétfő	Kaszadella csomag	Közepes tipp	2-es kötés	_Kdl_Köz_2_1_5	Almería - Ferrol	20:30 - Több, mint 1,5 (Hazai csapat - Gólszám 1,5)	1.41	2.64
ebb1f4a5-77ee-45c9-bce2-e1714be0d85f	2025-04-28	Hétfő	Start csomag	Duplázó	2-es kötés	_St_Dup_2_1_6	Lazio - Parma	20:45 - Lazio (1X2)	1.45	2.10
66aed445-5834-4c81-b8d0-58ad059acd14	2025-04-28	Hétfő	Start csomag	Duplázó	2-es kötés	_St_Dup_2_1_6	Almería - Ferrol	20:30 - Hazai és több (1X2 + Gólszám 1,5)	1.45	2.10
2225641d-c8b1-46f6-a94d-cb967edd4671	2025-04-28	Hétfő	Kasza csomag	Duplázó	2-es kötés	_Kas_Dup_2_1_7	Lazio - Parma	20:45 - Lazio (1X2)	1.45	2.10
32082244-f075-49ed-840d-00ade2ef93e7	2025-04-28	Hétfő	Kasza csomag	Duplázó	2-es kötés	_Kas_Dup_2_1_7	Almería - Ferrol	20:30 - Hazai és több (1X2 + Gólszám 1,5)	1.45	2.10
07dff08c-fde8-495b-9f0a-b2267896fe3f	2025-04-28	Hétfő	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Dup_2_1_8	Almería - Ferrol	20:30 - Hazai és több (1X2 + Gólszám 1,5)	1.45	2.10
f6a19173-c399-4626-841c-05d0c14639c7	2025-04-28	Hétfő	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Dup_2_1_8	Lazio - Parma	20:45 - Lazio (1X2)	1.45	2.10
6d1dd088-684f-4b43-a07e-ab13298ca906	2025-04-28	Hétfő	Kaszadella csomag	Közepes tipp	2-es kötés	20250428_Kdl_Köz_2_10	Udinese - Bologna	18:30 - Bologna (1X2)	1.68	3.02
967a44fe-334b-4e38-8ef7-2f642919753b	2025-04-28	Hétfő	Kaszadella csomag	Közepes tipp	2-es kötés	20250428_Kdl_Köz_2_10	Benfica B - Mafra	19:00 - Benfica B (1X2)	1.80	3.02
ae7220c1-ed98-47d7-ba42-c64ff96dca13	2025-04-28	Hétfő	Kaszadella csomag	Nagy tipp	3-as kötés	_Kdl_Nag_3_1_10	Utrecht - Volendam	20:00 - Volendam (1X2)	1.44	5.71
8fb34e46-ff1d-4968-ac47-6e4040debca9	2025-04-28	Hétfő	Kaszadella csomag	Nagy tipp	3-as kötés	_Kdl_Nag_3_1_10	Leeds - Bristol City	21:00 - Hazai és több (1X2 + Gólszám 1,5)	1.77	5.71
c0b19550-32af-45a6-85fa-1f630f65a25a	2025-04-28	Hétfő	Kaszadella csomag	Nagy tipp	3-as kötés	_Kdl_Nag_3_1_10	Göteborg - GAIS	19:10 - Hazai és kevesebb (1X2 + Gólszám 4,5)	2.24	5.71
397a6518-6208-4be0-b5ce-ce6d7868244c	2025-04-29	Kedd	Start csomag	Duplázó	1-es kötés	_St_Dup_Egyéni_1_1	Gamba Osaka - Kyoto	8:00 - Kyoto (Döntetlennél tét vissszajár)	2.06	2.06
2d86abb5-ac01-45e5-a03e-59cad8d8982d	2025-04-29	Kedd	Kasza csomag	Duplázó	1-es kötés	20250429_Kas_Dup_Egyéni_3	Gamba Osaka - Kyoto	8:00 - Kyoto (Döntetlennél a tét vissszajár)	2.06	2.06
10281404-ec8f-4795-9d78-a1b8da012967	2025-04-29	Kedd	Kaszadella csomag	Duplázó	1-es kötés	_Kdl_Dup_Egyéni_1_3	Gamba Osaka - Kyoto	8:00 - Kyoto (Döntetlennél a tét vissszajár)	2.06	2.06
2f2209ea-aec7-4422-92f0-b7c1d8a659ab	2025-04-29	Kedd	Kaszadella csomag	Közepes tipp	1-es kötés	_Kdl_Köz_Egyéni_1_4	Arsenal - Paris SG	21:00 - Több, mint 0,5 (K, Kvartashkhelia kezdőként kaput eltaláló gólszerzési kísérleteinek sz.) / Igen (Mindkét csapat szerez gólt)	3.26	3.26
b7b4092d-6418-4b3b-b0d6-889715a3fe98	2025-04-29	Kedd	Kasza csomag	Közepes tipp	3-as kötés	_Kas_Köz_3_1_8	Newell's - CA Huracan	04.30. 00:00 - Több, mint 1,5 (Gólszám 1,5)	1.47	4.62
b87a5f33-1300-4c8b-a1b2-285feb858bfb	2025-04-29	Kedd	Kasza csomag	Közepes tipp	3-as kötés	_Kas_Köz_3_1_8	Falkenberg - Örebro	19:00 - 2-3 Gólszám	1.94	4.62
5faf4277-484d-47d0-8543-421968758377	2025-04-29	Kedd	Kasza csomag	Közepes tipp	3-as kötés	_Kas_Köz_3_1_8	Arsenal - Paris SG	21:00 - Több, mint 3,5 (Vendégcsapat szögletszám 3,5)	1.62	4.62
3b69eca4-09f6-4220-9b6a-e006867fd8cf	2025-04-29	Kedd	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Dup_2_1_7	Burton - Wigan	20:45 - Döntetlen vagy Wigan (Kétesélyes)	1.46	2.41
0335a629-2c69-4425-a8b1-697565318b4f	2025-04-29	Kedd	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Dup_2_1_7	Maringa PR - Atlético MG	04.30. 00:30 - Atlético MG (1X2)	1.65	2.41
f96e6763-f6ab-48a0-96df-7aea34cd9b7d	2025-04-29	Kedd	Kasza csomag	Duplázó	2-es kötés	_Kas_Dup_2_1_6	Burton - Wigan	20:45 - Döntetlen vagy Wigan (Kétesélyes)	1.46	2.41
2b576fbe-0d19-413c-968c-778281c2ac60	2025-04-29	Kedd	Kasza csomag	Duplázó	2-es kötés	_Kas_Dup_2_1_6	Maringa PR - Atlético MG	04.30. 00:30 - Atlético MG (1X2)	1.65	2.41
a1e72e2d-706e-4e54-b5b8-d43c38a0e3d0	2025-04-29	Kedd	Start csomag	Duplázó	2-es kötés	_St_Dup_2_1_5	Burton - Wigan	20:45 - Döntetlen vagy Wigan (Kétesélyes)	1.46	2.41
55426103-96cf-42f6-936c-91c6fc44bb75	2025-04-29	Kedd	Start csomag	Duplázó	2-es kötés	_St_Dup_2_1_5	Maringa PR - Atlético MG	04.30. 00:30 - Atlético MG (1X2)	1.65	2.41
1a1447a0-a295-4820-a61e-e6b83a3475be	2025-04-29	Kedd	Kaszadella csomag	Közepes tipp	3-as kötés	20250429_Kdl_Köz_3_10	Newell's - CA Huracan	04.30. 00:00 - Több, mint 1,5 (Gólszám 1,5)	1.47	4.62
7ec12286-ca2f-473e-9bcc-840ada367d86	2025-04-29	Kedd	Kaszadella csomag	Közepes tipp	3-as kötés	20250429_Kdl_Köz_3_10	Falkenberg - Örebro	19:00 - 2-3 Gólszám	1.94	4.62
7891fd61-fda4-431a-bd81-5193603a3ef3	2025-04-29	Kedd	Kaszadella csomag	Közepes tipp	3-as kötés	20250429_Kdl_Köz_3_10	Arsenal - Paris SG	21:00 - Több, mint 3,5 (Vendégcsapat szögletszám 3,5)	1.62	4.62
fcebc510-3159-4bdf-a02a-1148babbe116	2025-04-29	Kedd	Kaszadella csomag	Nagy tipp	5-ös kötés	_Kdl_Nag_Egyéni_1_10	Arsenal - Paris SG	21:00 - Arsenal (Melyik csapat kap több büntetőlapot?)	2.35	5.48
f00ebfd4-e758-4fe5-a1bf-9e56c9bec987	2025-04-29	Kedd	Kaszadella csomag	Nagy tipp	5-ös kötés	_Kdl_Nag_Egyéni_1_10	Lyn N - Bodö/Glimt N	18:00 - Lyn (Döntetlennév tét visszajár)	1.20	5.48
b9d9e1dc-9fe8-46b7-afb5-19383c7103fd	2025-04-29	Kedd	Kaszadella csomag	Nagy tipp	5-ös kötés	_Kdl_Nag_Egyéni_1_10	Retro FC - Fortaleza	04.30. 00:00 - Retro FC vagy Fortaleza (1.félidő kétesélyes)	1.47	5.48
f1b88682-df46-4faf-a4ec-38aa9f88397c	2025-04-29	Kedd	Kaszadella csomag	Nagy tipp	5-ös kötés	_Kdl_Nag_Egyéni_1_10	Brann Berger . LSK Kvinner	18:00 - Több, mint 1,5 (Gólszám 1,5)	1.17	5.48
ff81ea86-39eb-464b-bce5-df304312695a	2025-04-29	Kedd	Kaszadella csomag	Nagy tipp	5-ös kötés	_Kdl_Nag_Egyéni_1_10	Al- Hilal (KSA) - Al- Ahli (KSA)	18:30 - Több, mint 1,5 (Gólszám 1,5)	1.13	5.48
59cdf0b9-2362-4ce0-a608-9c1786e32c21	2025-04-30	Szerda	Start csomag	Duplázó	2-es kötés	_St_Dup_2_1_1	U20 Dél-Afrika - U20 Tanánia	17:00 - 2-3 (Gólszám)	1.93	2.49
a01077c1-bfd5-4eca-be36-fc3b3f6d7ca8	2025-04-30	Szerda	Start csomag	Duplázó	2-es kötés	_St_Dup_2_1_1	U20 Sierra Leone - U20 Egyiptom	U20 Egyiptom (Döntetlennél a tét visszajár)	1.29	2.49
119c405a-fe4e-4044-9c13-97b02633e7d8	2025-04-30	Szerda	Kasza csomag	Duplázó	2-es kötés	_Kas_Dup_2_1_2	U20 Dél-Afrika - U20 Tanánia	17:00 - 2-3 (Gólszám)	1.93	2.49
879134fd-e9b9-4ea4-9367-76710325bdcc	2025-04-30	Szerda	Kasza csomag	Duplázó	2-es kötés	_Kas_Dup_2_1_2	U20 Sierra Leone - U20 Egyiptom	U20 Egyiptom (Döntetlennél a tét visszajár)	1.29	2.49
757b5a55-2ad9-4d02-9751-b0e69a20f161	2025-04-30	Szerda	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Dup_2_1_3	U20 Dél-Afrika - U20 Tanánia	17:00 - 2-3 (Gólszám)	1.93	2.49
6954b126-a7d9-4f89-bdcb-289aa0991c5f	2025-04-30	Szerda	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Dup_2_1_3	U20 Sierra Leone - U20 Egyiptom	U20 Egyiptom (Döntetlennél a tét visszajár)	1.29	2.49
eeb7703c-ad20-41e6-a604-56e024ad3041	2025-04-30	Szerda	Start csomag	Duplázó	3-as kötés	_St_Dup_3_1_4	Al-Nassr - Kawasaki Frontale	18:30 - Al-Nassr (1X2)	1.28	2.49
02960e36-7bde-42e2-90c6-36f5633ded01	2025-04-30	Szerda	Start csomag	Duplázó	3-as kötés	_St_Dup_3_1_4	Aston Villa N - Arsenal N	19:00 - Arsenal N (1X2)	1.24	2.49
d3bd2527-38a7-4fff-ac76-b4f67aacd546	2025-04-30	Szerda	Start csomag	Duplázó	3-as kötés	_St_Dup_3_1_4	Barcelona - Internazionale	21:00 - Igen (Mindkét csapat szerez gólt)	1.57	2.49
19f16497-aca7-43a4-af22-4b9d30a8bde3	2025-04-30	Szerda	Kasza csomag	Duplázó	2-es kötés	_Kas_Dup_2_1_5	Al-Nassr - Kawasaki Frontale	18:30 - Al-Nassr (1X2)	1.28	2.49
7eed9062-ab49-47dc-9a98-d8e8d15cf1a7	2025-04-30	Szerda	Kasza csomag	Duplázó	2-es kötés	_Kas_Dup_2_1_5	Aston Villa N - Arsenal N	19:00 - Arsenal N (1X2)	1.24	2.49
66b63e22-c2cf-45e3-9f09-511b170451b4	2025-04-30	Szerda	Kasza csomag	Duplázó	2-es kötés	_Kas_Dup_2_1_5	Barcelona - Internazionale	21:00 - Igen (Mindkét csapat szerez gólt)	1.57	2.49
e3ae38e3-778a-4692-b862-3f266e8bd163	2025-04-30	Szerda	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Dup_2_1_6	Barcelona - Internazionale	21:00 - Igen (Mindkét csapat szerez gólt)	1.57	2.49
ccbe6d4b-6e73-4efe-a861-886b65c13e7f	2025-04-30	Szerda	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Dup_2_1_6	Aston Villa N - Arsenal N	19:00 - Arsenal N (1X2)	1.24	2.49
942a107d-fc37-4758-b648-8590052c62e9	2025-04-30	Szerda	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Dup_2_1_6	Al-Nassr - Kawasaki Frontale	18:30 - Al-Nassr (1X2)	1.28	2.49
9e642af8-fa9f-483c-b127-795dc1188524	2025-04-30	Szerda	Kasza csomag	Közepes tipp	3-as kötés	20250430_Kas_Köz_3_10	Barcelona - Internazionale	21:00 - Több, mint 0,5 (RAPHINA kezdőként kaput eltaláló gólszerzési kísérleteinek száma)	1.46	3.73
b315f75d-5503-4f8c-aee7-89a20e58eb1e	2025-04-30	Szerda	Kasza csomag	Közepes tipp	3-as kötés	20250430_Kas_Köz_3_10	Manchester Utd. N - Chelsea N	21:15 - 2-3 (Gólszám)	1.95	3.73
538a98ee-a4e5-4d65-99e3-376e3d7d030f	2025-04-30	Szerda	Kasza csomag	Közepes tipp	3-as kötés	20250430_Kas_Köz_3_10	Koper - Celje	18:45 - Több, mint 2 (Ázsiai Gólszám 2)	1.31	3.73
50d7e744-6a21-48ed-ba4b-fc023f20769a	2025-04-30	Szerda	Kaszadella csomag	Közepes tipp	3-as kötés	_Kdl_Köz_3_1_8	Barcelona - Internazionale	21:00 - Több, mint 0,5 (RAPHINA kezdőként kaput eltaláló gólszerzési kísérleteinek száma)	1.46	3.73
ce5a2d5e-879b-402f-9d3e-16351a3101b3	2025-04-30	Szerda	Kaszadella csomag	Közepes tipp	3-as kötés	_Kdl_Köz_3_1_8	Manchester Utd. N - Chelsea N	21:15 - 2-3 (Gólszám)	1.95	3.73
cf7d00a7-a800-4c24-bc6f-5ab608473491	2025-04-30	Szerda	Kaszadella csomag	Közepes tipp	3-as kötés	_Kdl_Köz_3_1_8	Koper - Celje	18:45 - Több, mint 2 (Ázsiai Gólszám 2)	1.31	3.73
e1d187f7-cb40-49cd-b120-052f3d139bea	2025-04-30	Szerda	Kaszadella csomag	Közepes tipp	3-as kötés	_Kdl_Köz_3_1_9	Blackpool - Birmingham	20:45 - Birmingham (1X2)	1.73	3.61
df5f6288-6d05-4ec6-8af1-d1e7248bc877	2025-04-30	Szerda	Kaszadella csomag	Közepes tipp	3-as kötés	_Kdl_Köz_3_1_9	Inter Miami - Vancouver	05.01. 02:00 - Hazai és több (1X2 + Gólszám 1,5)	1.63	3.61
60f058bb-92e7-46d7-a278-36a646416216	2025-04-30	Szerda	Kaszadella csomag	Közepes tipp	3-as kötés	_Kdl_Köz_3_1_9	Al-Nassr - Kawasaki Frontale	18:30 - Al-Nassr (1X2)	1.28	3.61
e8697f62-0c8f-4937-beb8-17ffe51cea38	2025-04-30	Szerda	Kaszadella csomag	Nagy tipp	4-es kötés	_Kdl_Nag_4_1_10	Mansfield - Peterborough	20:45 - Peterborough (Hendikep 0:2)	1.21	5.99
28cd1a65-bd08-4398-b96c-9cce1a995fd3	2025-04-30	Szerda	Kaszadella csomag	Nagy tipp	4-es kötés	_Kdl_Nag_4_1_10	Mumbai City - Jamshedpur	16:30 - Jamshedpur (Hendikep 0:2)	1.21	5.99
4d89e82b-3cf5-4a32-8821-aa5c04cf028c	2025-04-30	Szerda	Kaszadella csomag	Nagy tipp	4-es kötés	_Kdl_Nag_4_1_10	Barcelona - Internazionale	21:00 - Yamal, Lamine 1+ (Kezdőként hány gólpasszt ad?)	3.30	5.99
af2c8eae-4197-4e10-8527-d30f39c0c91c	2025-04-30	Szerda	Kaszadella csomag	Nagy tipp	4-es kötés	_Kdl_Nag_4_1_10	U20 Sierra Leone - U20 Egyiptom	Nem (Hazai csapat kapott gól nélkül játssza le a mérkőzést)	1.24	5.99
8ee70c0a-1c6c-4c29-821a-9f6f2a6ec66e	2025-05-01	Csütörtök	Kasza csomag	Duplázó	2-es kötés	_Kas_Dup_2_1_2	Modena - Reggiana	15:00 - Modena (Döntetlennél a tét visszajár)	1.32	2.01
fde72809-6df9-4fff-890d-7ee6acf54abb	2025-05-01	Csütörtök	Kasza csomag	Duplázó	2-es kötés	_Kas_Dup_2_1_2	Wolfsberg - Hartberg	17:00 - Wolfsberg vagy Döntetlen (Kétesélyes)/ Nem (Vendég csapat kapott gól nélkül játssza le a mérkőzést)/ Kevesebb, mint 2,5 (1. félidő - Gólszám 2,5)	1.52	2.01
09a44b03-d7bc-4c09-abda-6016ced5885b	2025-05-01	Csütörtök	Kaszadella csomag	Közepes tipp	2-es kötés	_Kdl_Köz_2_1_3	Wolfsberg - Hartberg	17:00 - Wolfsberg vagy Döntetlen (Kétesélyes)/ Nem (Vendég csapat kapott gól nélkül játssza le a mérkőzést)/ Kevesebb, mint 2,5 (1. félidő - Gólszám 2,5)	1.52	2.01
15238049-08e6-4e1d-9da3-afd73e241236	2025-05-01	Csütörtök	Kaszadella csomag	Közepes tipp	2-es kötés	_Kdl_Köz_2_1_3	Modena - Reggiana	15:00 - Modena (Döntetlennél a tét visszajár)	1.32	2.01
09727639-9939-4dec-985b-f52342de234e	2025-05-01	Csütörtök	Kasza csomag	Közepes tipp	2-es kötés	_Kas_Köz_2_1_4	Nottingham - Brentford	20:30 - Igen (Mindkét csapat szerez gólt)	1.59	2.88
17133016-8acf-4fd4-85ef-82b63340b1d5	2025-05-01	Csütörtök	Kasza csomag	Közepes tipp	2-es kötés	_Kas_Köz_2_1_4	Betis - Fiorentina	21:00 - Igen (Mindkét csapat szerez gólt)	1.81	2.88
60da6ed0-61b9-4706-b38a-79fb1b2c4f8c	2025-05-01	Csütörtök	Kaszadella csomag	Közepes tipp	2-es kötés	_Kdl_Köz_2_1_5	Nottingham - Brentford	20:30 - Igen (Mindkét csapat szerez gólt)	1.59	2.88
25f4e211-6cd2-4887-abba-443b9899908a	2025-05-01	Csütörtök	Kaszadella csomag	Közepes tipp	2-es kötés	_Kdl_Köz_2_1_5	Betis - Fiorentina	21:00 - Igen (Mindkét csapat szerez gólt)	1.81	2.88
fb8605b0-3e85-418e-9c86-c75350db96a5	2025-05-01	Csütörtök	Start csomag	Duplázó	3-as kötés	_St_Dup_3_1_6	Veszprém - Magdeburg	18:45 - Veszprém (1X2)	1.55	2.25
b19735f6-6b6b-45dd-8049-8542e10f5911	2025-05-01	Csütörtök	Start csomag	Duplázó	3-as kötés	_St_Dup_3_1_6	Djugarden - Chelsea	21:00 - Chelsea (1X2)	1.20	2.25
7c0ef2cc-fedf-454a-9ea9-7368c7c201cb	2025-05-01	Csütörtök	Start csomag	Duplázó	2-es kötés	_St_Dup_2_1_1	Modena - Reggiana	15:00 - Modena (Döntetlennél a tét visszajár)	1.32	2.01
97629c0b-28de-4bb9-9177-20d523462971	2025-05-01	Csütörtök	Start csomag	Duplázó	2-es kötés	_St_Dup_2_1_1	Wolfsberg - Hartberg	17:00 - Wolfsberg vagy Döntetlen (Kétesélyes)/ Nem (Vendég csapat kapott gól nélkül játssza le a mérkőzést)/ Kevesebb, mint 2,5 (1. félidő - Gólszám 2,5)	1.52	2.01
a87872df-611e-4270-b3dc-394c74132df6	2025-05-01	Csütörtök	Start csomag	Duplázó	3-as kötés	_St_Dup_3_1_6	Tottenham - Bodö/Glimt	21:00 - Tottenham (1X2)	1.21	2.25
ef65494c-e998-4a5c-9eab-fc60c581a502	2025-05-01	Csütörtök	Start csomag	Duplázó	3-as kötés	_St_Dup_3_1_7	Veszprém - Magdeburg	18:45 - Veszprém (1X2)	1.55	2.25
86758537-fd3a-4010-a553-123b77072927	2025-05-01	Csütörtök	Start csomag	Duplázó	3-as kötés	_St_Dup_3_1_7	Djugarden - Chelsea	21:00 - Chelsea (1X2)	1.20	2.25
2055113e-b18f-40ff-85a9-7a25111e89df	2025-05-01	Csütörtök	Start csomag	Duplázó	3-as kötés	_St_Dup_3_1_7	Tottenham - Bodö/Glimt	21:00 - Tottenham (1X2)	1.21	2.25
bfb2acd3-3685-4134-bd37-e248cc0d018d	2025-05-01	Csütörtök	Kaszadella csomag	Duplázó	3-as kötés	_Kdl_Dup_3_1_8	Tottenham - Bodö/Glimt	21:00 - Tottenham (1X2)	1.21	2.25
72eaa930-0053-47b9-9a27-b8fafb370364	2025-05-01	Csütörtök	Kaszadella csomag	Duplázó	3-as kötés	_Kdl_Dup_3_1_8	Djugarden - Chelsea	21:00 - Chelsea (1X2)	1.20	2.25
ee595d17-d7ae-4e31-89dd-dd141055b519	2025-05-01	Csütörtök	Kaszadella csomag	Duplázó	3-as kötés	_Kdl_Dup_3_1_8	Veszprém - Magdeburg	18:45 - Veszprém (1X2)	1.55	2.25
67bc5284-a1b6-4ff3-bddd-95677d2639e5	2025-05-01	Csütörtök	Kaszadella csomag	Közepes tipp	3-as kötés	_Kdl_Köz_3_1_9	Ath. Bilbao - Manchester Utd.	21:00 - Ath. Bilbao (Döntetlennél a tét visszajár)	1.39	3.13
877aa994-01a5-4da7-b6f3-f8c5ab279a9f	2025-05-01	Csütörtök	Kaszadella csomag	Közepes tipp	3-as kötés	_Kdl_Köz_3_1_9	Djurgarden - Chelsea	21:00 - Több, mint 2,5 (Gólszám 2,5)	1.46	3.13
59fd764a-7b7b-4c2c-ba75-6b1cf0e59b8b	2025-05-01	Csütörtök	Kaszadella csomag	Közepes tipp	3-as kötés	_Kdl_Köz_3_1_9	Nottingham - Brentford	20:30 - Notthingham (Döntetlennél a tét visszajár)	1.54	3.13
56b66508-dc2a-40cd-b143-77af68a19f71	2025-05-02	Péntek	Start csomag	Duplázó	2-es kötés	_St_Dup_2_1_1	Pohang - Gimcheon Sangmu	12:30 - Több, mint 1,5 (Gólszám 1,5)	1.21	2.06
4b860b70-b675-4e84-8347-b2a11988b75c	2025-05-02	Péntek	Start csomag	Duplázó	2-es kötés	_St_Dup_2_1_1	Manchester City - Wolverhampton	21:00 - Igen (Mindkét csapat szerez gólt)	1.70	2.06
c3e1ea03-33f4-43c5-85f8-9a38b270a970	2025-05-02	Péntek	Kasza csomag	Duplázó	2-es kötés	_Kas_Dup_2_1_2	Pohang - Gimcheon Sangmu	12:30 - Több, mint 1,5 (Gólszám 1,5)	1.21	2.06
7d93029e-17df-4722-83f2-935362db6dd0	2025-05-02	Péntek	Kasza csomag	Duplázó	2-es kötés	_Kas_Dup_2_1_2	Manchester City - Wolverhampton	21:00 - Igen (Mindkét csapat szerez gólt)	1.70	2.06
c7687da1-121e-451a-888a-2c880c529a40	2025-05-02	Péntek	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Dup_2_1_3	Pohang - Gimcheon Sangmu	12:30 - Több, mint 1,5 (Gólszám 1,5)	1.21	2.06
01c8dff6-dfd5-4749-a435-a08f1d0307c6	2025-05-02	Péntek	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Dup_2_1_3	Manchester City - Wolverhampton	21:00 - Igen (Mindkét csapat szerez gólt)	1.70	2.06
fe3c7acd-7235-41cc-a1e4-2e5312bf0898	2025-05-02	Péntek	Kasza csomag	Közepes tipp	2-es kötés	_Kas_Köz_2_1_4	Slavia Szófia - CSZKA 1948	16:30 - Slavia Szófia (Döntetlennél a tét visszajár)	1.62	3.14
9e536e4b-2aa2-4026-8fa9-6d9cc563a41a	2025-05-02	Péntek	Kasza csomag	Közepes tipp	2-es kötés	_Kas_Köz_2_1_4	Politehnica Iasi - Sepsi OSK	16:30 - Politehnica Iasi (Döntetlennél a tét visszajár)	1.94	3.14
1a15a49f-3297-4e8b-934c-0a5d4e24d7e2	2025-05-02	Péntek	Kasza csomag	Duplázó	1-es kötés	_Kas_Dup_Egyéni_1_6	Volendam - Roda	20:00 - Igen (Mindkét csapat szerez gólt) / Volendam (1X2)	2.41	2.41
d2a90540-500a-45d2-9235-1e371deb7b90	2025-05-02	Péntek	Kaszadella csomag	Duplázó	1-es kötés	_Kdl_Dup_Egyéni_1_7	Volendam - Roda	20:00 - Igen (Mindkét csapat szerez gólt) / Volendam (1X2)	2.41	2.41
51339b8a-29a4-408a-ba40-49cccd924324	2025-05-02	Péntek	Kaszadella csomag	Közepes tipp	3-as kötés	_Kdl_Köz_3_1_8	Chengdu Rongcheng - Shanghai Shenhua	13:35 - Igen (Mindkét csapat szerez gólt)	1.56	3.76
8a4c6bc0-d674-4b2e-b0c6-11f6b3787c15	2025-05-02	Péntek	Kaszadella csomag	Közepes tipp	3-as kötés	_Kdl_Köz_3_1_8	AC Ajaccio - Lorient	20:00 - Több, mint 1,5 (Gólszám 1,5)/ Lorient (1X2)	1.90	3.76
a11f8490-1a70-4d2d-a4bc-0e472b9fedeb	2025-05-02	Péntek	Kaszadella csomag	Közepes tipp	3-as kötés	_Kdl_Köz_3_1_8	U20Szenegál - U20Közép-afrikai Köztársaság	17:00 - Több, mint 1,5 (Gólszám 1,5)	1.27	3.76
dde6b314-7494-468d-b06c-cacad70466c8	2025-05-02	Péntek	Start csomag	Duplázó	1-es kötés	_St_Dup_Egyéni_1_5	Volendam - Roda	20:00 - Igen (Mindkét csapat szerez gólt) / Volendam (1X2)	2.41	2.41
f4c227bd-1df9-4086-83b4-3cd003932fc2	2025-05-02	Péntek	Kaszadella csomag	Közepes tipp	2-es kötés	20250502_Kdl_Köz_2_2	Slavia Szófia - CSZKA 1948	16:30 - Slavia Szófia (Döntetlennél a tét visszajár)	1.62	3.14
2560d12a-66d9-42f4-9206-94841c42bf36	2025-05-02	Péntek	Kaszadella csomag	Közepes tipp	2-es kötés	20250502_Kdl_Köz_2_2	Politehnica Iasi - Sepsi OSK	16:30 - Politehnica Iasi (Döntetlennél a tét visszajár)	1.94	3.14
4926a35c-e1f2-44bf-a5f7-3b9f3064674a	2025-05-03	Szombat	Kasza csomag	Duplázó	2-es kötés	_Kas_Dup_2_1_2	Braga - Santa Clara	19:00 - Braga (1X2)	1.59	2.37
72cef289-c982-46b9-850d-ebfe1cadcd40	2025-05-03	Szombat	Start csomag	Duplázó	2-es kötés	_St_Dup_2_1_1	DVSC - MTK	15:30 - Igen (Mindkét csapat szerez gólt)	1.49	2.37
5544e4b5-934a-42e1-9310-6c287edd48b3	2025-05-03	Szombat	Start csomag	Duplázó	2-es kötés	_St_Dup_2_1_1	Braga - Santa Clara	19:00 - Braga (1X2)	1.59	2.37
33569437-57f8-4556-8ee5-a6b86c66132f	2025-05-03	Szombat	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Dup_2_1_3	DVSC - MTK	15:30 - Igen (Mindkét csapat szerez gólt)	1.49	2.37
3ce5194b-4f51-4e99-b222-58131a48c1ba	2025-05-03	Szombat	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Dup_2_1_3	Braga - Santa Clara	19:00 - Braga (1X2)	1.59	2.37
2aed0c9d-9698-45fe-b725-138f5abde2ad	2025-05-03	Szombat	Kasza csomag	Duplázó	2-es kötés	_Kas_Dup_2_1_2	DVSC - MTK	15:30 - Igen (Mindkét csapat szerez gólt)	1.49	2.37
a41c41db-2bf6-44a9-8df3-71b204cfe8ae	2025-05-03	Szombat	Kasza csomag	Duplázó	2-es kötés	_Kas_Dup_2_1_5	Huddersfield - Leyton	16:00 - Leyton (1X2)	1.66	2.26
525087c6-34d9-4570-ad6e-852f4d17e694	2025-05-03	Szombat	Kasza csomag	Duplázó	2-es kötés	_Kas_Dup_2_1_5	Cambridge Utd. - Birmingham	16:00 - Birmingham (1X2)	1.36	2.26
a5e1d752-d6c9-4ad0-b085-9f01e03df54b	2025-05-03	Szombat	Kasza csomag	Közepes tipp	2-es kötés	_Kas_Köz_2_1_11	Újpest - Győr	13:00 - Győr (Döntetlennél a tét visszajár)	1.84	2.74
c94a6eb2-bb19-4d3a-8225-f114dfa804bc	2025-05-03	Szombat	Kasza csomag	Közepes tipp	2-es kötés	_Kas_Köz_2_1_11	Aston Villa - Fulham	13:30 - Aston Villa (Hendikep 1:0)/ Több, mint 0,5 (2. félidő - Gólszám 0,5)	1.49	2.74
f1a22740-e4c3-4fd2-bd48-818276e92690	2025-05-03	Szombat	Kaszadella csomag	Közepes tipp	2-es kötés	_Kdl_Köz_2_1_12	Újpest - Győr	13:00 - Győr (Döntetlennél a tét visszajár)	1.84	2.74
96095aee-6046-4744-8a2b-aa6dbbc3d2c5	2025-05-03	Szombat	Kaszadella csomag	Közepes tipp	2-es kötés	_Kdl_Köz_2_1_12	Aston Villa - Fulham	13:30 - Aston Villa (Hendikep 1:0)/ Több, mint 0,5 (2. félidő - Gólszám 0,5)	1.49	2.74
6cca4055-98d9-47fa-8a11-0e91eabadc22	2025-05-03	Szombat	Start csomag	Duplázó	2-es kötés	_St_Dup_2_1_4	Huddersfield - Leyton	16:00 - Leyton (1X2)	1.66	2.26
a9d85362-34a6-43ac-a78f-88b941fa2fa6	2025-05-03	Szombat	Start csomag	Duplázó	2-es kötés	_St_Dup_2_1_4	Cambridge Utd. - Birmingham	16:00 - Birmingham (1X2)	1.36	2.26
e767c93d-b829-4283-bf6f-37ebebe1e311	2025-05-03	Szombat	Start csomag	Közepes tipp	2-es kötés	_St_Köz_2_1_10	Újpest - Győr	13:00 - Győr (Döntetlennél a tét visszajár)	1.84	2.74
98778fda-1353-464f-bef9-ac7ee4244c4f	2025-05-03	Szombat	Start csomag	Közepes tipp	2-es kötés	_St_Köz_2_1_10	Aston Villa - Fulham	13:30 - Aston Villa (Hendikep 1:0)/ Több, mint 0,5 (2. félidő - Gólszám 0,5)	1.49	2.74
12b2a56b-95e7-47c3-84d5-d60b35bb268f	2025-05-03	Szombat	Kaszadella csomag	Közepes tipp	2-es kötés	_Kdl_Köz_2_1_2	Varberg - Helsingborg	15:00 - Varberg (Döntetlennél a tét visszajár)	1.65	2.71
d57a6e7c-1c93-4f8e-ada5-3d7685ac71b0	2025-05-03	Szombat	Kaszadella csomag	Közepes tipp	2-es kötés	_Kdl_Köz_2_1_2	Parma - Como	15:00 - Igen (Mindkét csapat szerez gólt)	1.64	2.71
9a876bed-19e4-43d7-b8c2-55d86dbc9285	2025-05-03	Szombat	Kaszadella csomag	Nagy tipp	3-as kötés	_Kdl_Nag_3_1_3	Hradec Karlove - Karvina	13:30 - 2-3 (Gólszám)	1.95	5.62
95b65ed3-193d-4abe-b695-fdb65e2b8c69	2025-05-03	Szombat	Kaszadella csomag	Nagy tipp	3-as kötés	_Kdl_Nag_3_1_3	Napredak Krusevac - Cukaricki	14:00 - Nem (Hazai csapat kapott gól nélkül játssza le a mérkőzést)/ Több, mint 1,5 (Gólszám 1,5)	1.50	5.62
341dab30-303f-4e7d-852e-aaf8f94469be	2025-05-03	Szombat	Kaszadella csomag	Nagy tipp	3-as kötés	_Kdl_Nag_3_1_3	Alavés - Atl. Madrid	14:00 - 2-3 (Gólszám)	1.92	5.62
4cb9f802-b4ed-4a47-83c7-4209ec2a81eb	2025-05-03	Szombat	Kasza csomag	Nagy tipp	2-es kötés	_Kas_Nag_2_1_4	Hradec Karlove - Karvina	13:30 - 2-3 (Gólszám)	1.95	5.62
bd210d71-a060-4dcd-a6dc-8c115c7b1672	2025-05-03	Szombat	Kasza csomag	Nagy tipp	2-es kötés	_Kas_Nag_2_1_4	Napredak Krusevac - Cukaricki	14:00 - Nem (Hazai csapat kapott gól nélkül játssza le a mérkőzést)/ Több, mint 1,5 (Gólszám 1,5)	1.50	5.62
5a72cfde-36e7-46b2-adcd-2d423e44c4dd	2025-05-03	Szombat	Kasza csomag	Nagy tipp	2-es kötés	_Kas_Nag_2_1_4	Alavés - Atl. Madrid	14:00 - 2-3 (Gólszám)	1.92	5.62
c0b13871-bf16-42ed-ac93-9c3d2794ec12	2025-05-03	Szombat	Kasza csomag	Közepes tipp	3-as kötés	_Kas_Köz_3_1_1	Arsenal - Bournemouth	18:30 - Arsenal (Melyik csapat végez el több szögletet?)	1.40	2.62
e73c00c3-9f5c-4810-a7c7-3f440582cc52	2025-05-03	Szombat	Kasza csomag	Közepes tipp	3-as kötés	_Kas_Köz_3_1_1	Alavés - Atl. Madrid	14:00 - Döntetlen vagy Atl. Madrid (Kétesélyes)	1.23	2.62
7ec0320b-88ef-4f34-ac95-4cee49551f4f	2025-05-03	Szombat	Kasza csomag	Közepes tipp	3-as kötés	_Kas_Köz_3_1_1	Valladolid - Barcelona	21:00 - Barcelona -3,5 (Szöglet hendikep 3,5)	1.52	2.62
ce915644-670b-4e2b-8fc6-d03a82948c59	2025-05-03	Szombat	Kaszadella csomag	Duplázó	3-as kötés	_Kdl_Dup_3_1_3	Burnley - Millwall	13:30 - Burnley vagy Döntetlen (Kétesélyes)	1.13	2.43
7344f978-1942-4ab2-b836-c836e17f457d	2025-05-03	Szombat	Kasza csomag	Duplázó	2-es kötés	_Kas_Köz_2_1_1	Varberg - Helsingborg	15:00 - Varberg (Döntetlennél a tét visszajár)	1.65	2.71
9b1ddbbd-0145-411e-9fe5-c60f60ebb838	2025-05-03	Szombat	Kasza csomag	Duplázó	2-es kötés	_Kas_Köz_2_1_1	Parma - Como	15:00 - Igen (Mindkét csapat szerez gólt)	1.29	2.71
c697e320-e1a9-435f-88df-c5f2afce96dc	2025-05-03	Szombat	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Dup_2_1_6	Cambridge Utd. - Birmingham	16:00 - Birmingham (1X2)	1.36	2.26
17a64232-8f5e-481e-86ba-e90e47c16a45	2025-05-03	Szombat	Kasza csomag	Duplázó	3-as kötés	20250503_Kas_Dup_3_9	Alavés - Atl. Madrid	14:00 - Döntetlen vagy Atl. Madrid (Kétesélyes)	1.23	2.16
11200a14-f3f3-4328-b8df-9c08d5b39bc1	2025-05-03	Szombat	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Dup_2_1_6	Huddersfield - Leyton	16:00 - Leyton (1X2)	1.66	2.26
2dcae8d1-1d80-4450-b4ae-a2aa805c3a97	2025-05-03	Szombat	Kaszadella csomag	Közepes tipp	3-as kötés	20250503_Kdl_Köz_3_3	Arsenal - Bournemouth	18:30 - Arsenal (Melyik csapat végez el több szögletet?)	1.40	2.62
2d5c1b31-8d82-4694-9536-8331194e1d3a	2025-05-03	Szombat	Start csomag	Duplázó	3-as kötés	20250503_St_Dup_3_9	Strasbourg - Paris SG	17:00 - Igen (Mindkét csapat szerez gólt)	1.38	2.16
6d3c76f2-9c50-42f6-98bd-2a49edc08f07	2025-05-03	Szombat	Kasza csomag	Duplázó	3-as kötés	20250503_Kas_Dup_3_9	Strasbourg - Paris SG	17:00 - Igen (Mindkét csapat szerez gólt)	1.38	2.16
15df14e1-ef85-4133-976b-646859aad632	2025-05-03	Szombat	Start csomag	Duplázó	3-as kötés	20250503_St_Dup_3_9	Toulouse - Rennes	19:00 - Toulouse vagy Döntetlen (Kétesélyes)	1.27	2.16
8ddef335-23c1-48f1-b94b-86c7b9a2dd02	2025-05-03	Szombat	Kasza csomag	Duplázó	3-as kötés	20250503_Kas_Dup_3_9	Toulouse - Rennes	19:00 - Toulouse vagy Döntetlen (Kétesélyes)	1.27	2.16
ebafb194-903b-4487-9835-a32fad3f7af5	2025-05-03	Szombat	Kaszadella csomag	Duplázó	3-as kötés	_Kdl_Dup_3_1_9	Toulouse - Rennes	19:00 - Toulouse vagy Döntetlen (Kétesélyes)	1.27	2.16
a8e8ffba-522f-4720-a4b2-e43794dcc97e	2025-05-03	Szombat	Start csomag	Duplázó	3-as kötés	20250503_St_Dup_3_9	Alavés - Atl. Madrid	14:00 - Döntetlen vagy Atl. Madrid (Kétesélyes)	1.23	2.16
5ee20503-4b2e-476f-8c99-50a2a4d8322f	2025-05-03	Szombat	Kaszadella csomag	Duplázó	3-as kötés	_Kdl_Dup_3_1_9	Alavés - Atl. Madrid	14:00 - Döntetlen vagy Atl. Madrid (Kétesélyes)	1.23	2.16
67723778-d5bb-4605-ac43-a61e85c5a6cf	2025-05-03	Szombat	Kaszadella csomag	Duplázó	3-as kötés	_Kdl_Dup_3_1_9	Strasbourg - Paris SG	17:00 - Igen (Mindkét csapat szerez gólt)	1.38	2.16
f3619f2a-4e25-48b8-8bf3-6ba809c8b01d	2025-05-03	Szombat	Kaszadella csomag	Közepes tipp	3-as kötés	20250503_Kdl_Köz_3_3	Alavés - Atl. Madrid	14:00 - Döntetlen vagy Atl. Madrid (Kétesélyes)	1.23	2.62
e1e7c285-0525-494d-9fba-0a1b7f154bf9	2025-05-03	Szombat	Kaszadella csomag	Közepes tipp	3-as kötés	20250503_Kdl_Köz_3_3	Valladolid - Barcelona	21:00 - Barcelona -3,5 (Szöglet hendikep 3,5)	1.52	2.62
0ed00816-0123-4865-8c78-ca7241948c0c	2025-05-03	Szombat	Kaszadella csomag	Duplázó	3-as kötés	_Kdl_Dup_3_1_3	Swansea - Oxford Utd.	13:30 -Swansea vagy Döntetlen (Kétesélyes)	1.15	2.43
1dc07066-f284-4dd0-b25d-1e1f901ebad2	2025-05-03	Szombat	Kaszadella csomag	Duplázó	3-as kötés	_Kdl_Dup_3_1_3	Arsenal - Bournemouth	18:30 - Arsenal vagy Döntetlen (Kétesélyes)/ Arsenal (Melyik csapat végez el több szögletet?)	1.87	2.43
51ceeab0-b7d8-4509-8ef2-97ec4961f46d	2025-05-03	Szombat	Kaszadella csomag	Nagy tipp	3-as kötés	_Kdl_Nag_3_1_5	Farense - Famalicao	16:30 - Famalicao (Döntetlennél a tét visszajár)	1.84	5.84
24cc7142-7a45-4125-ac49-455d907b4574	2025-05-03	Szombat	Kaszadella csomag	Nagy tipp	3-as kötés	_Kdl_Nag_3_1_5	Shimizu SP - Naygoya GE	7:00 - Shimizu SP (Döntetlennél a tét visszajár)	1.61	5.84
b9655cbc-7ceb-459f-8d4e-5e552835739e	2025-05-03	Szombat	Kaszadella csomag	Nagy tipp	3-as kötés	_Kdl_Nag_3_1_5	Kashima A. - Machida Zelvia	8:00 - Kashima A. (Döntetlennél a tét visszajár)	1.97	5.84
c167416d-af2f-4c4e-8e23-99f05db2696b	2025-05-03	Szombat	Kaszadella csomag	Nagy tipp	4-es kötés	_Kdl_Nag_4_1_4	Újpest - Győr	13:00 - Igen (Mindkét csapat szerez gólt)	1.51	5.71
80c41f1c-d689-416d-854b-67a833ed1262	2025-05-03	Szombat	Kaszadella csomag	Nagy tipp	4-es kötés	_Kdl_Nag_4_1_4	FTC - Puskás Akadémia	19:30 - Igen (Mindkét csapat szerez gólt)	1.74	5.71
61ef8849-4b98-40ac-994f-8edf07882dbd	2025-05-03	Szombat	Kaszadella csomag	Nagy tipp	4-es kötés	_Kdl_Nag_4_1_4	RB Leipzig - Bayern München	15:30 - Bayern München -0,5 (Szöglet hendikep -0,5)	1.41	5.71
db70b3f8-e185-40c8-8e9d-d2d20e9a9ee0	2025-05-03	Szombat	Kaszadella csomag	Nagy tipp	4-es kötés	_Kdl_Nag_4_1_4	Dortmund - Wolfsburg	18:30 - Dortmund -2,5 (Szöglet hendikep -2,5)	1.54	5.71
b18714fb-2cf3-4c78-828a-e4dfb4a1abb6	2025-05-04	Vasárnap	Start csomag	Duplázó	2-es kötés	_St_Dup_2_1_1	Slovacko - Ceske Budejovice	13:00 - Slovacko (1X2)	1.31	2.00
718b899f-ea1e-4200-9995-5bb57ed20c72	2025-05-04	Vasárnap	Start csomag	Duplázó	2-es kötés	_St_Dup_2_1_1	Melbourne Victory - Newcastle Jets	9:00 - Igen és több, mint 2,5 (Mindkét csapat szerez gólt + gólszám 2,5)	1.53	2.00
e1b64f63-de73-490b-9482-073b35e5e9dc	2025-05-04	Vasárnap	Kasza csomag	Duplázó	2-es kötés	_Kas_Dup_2_1_2	Slovacko - Ceske Budejovice	13:00 - Slovacko (1X2)	1.31	2.00
015c5396-b363-4235-8115-35a1ff928b4b	2025-05-04	Vasárnap	Kasza csomag	Duplázó	2-es kötés	_Kas_Dup_2_1_2	Melbourne Victory - Newcastle Jets	9:00 - Igen és több, mint 2,5 (Mindkét csapat szerez gólt + gólszám 2,5)	1.53	2.00
87e9c2fe-8029-4af6-acea-6324c54c3fa9	2025-05-04	Vasárnap	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Dup_2_1_3	Melbourne Victory - Newcastle Jets	9:00 - Igen és több, mint 2,5 (Mindkét csapat szerez gólt + gólszám 2,5)	1.53	2.00
297e0cba-b586-4459-af72-b29f0e2a12fa	2025-05-04	Vasárnap	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Dup_2_1_3	Slovacko - Veste Budejovice	13:00 - Slovacko (1X2)	1.31	2.00
c3a94bb3-4977-4d5b-9584-16a7bcf3eec6	2025-05-04	Vasárnap	Start csomag	Duplázó	2-es kötés	_St_Dup_2_1_4	Öster - Hammarby	16:30 - Hammarby (1X2)	1.47	2.37
b1485257-a499-4504-adf5-2744db974bfc	2025-05-04	Vasárnap	Start csomag	Duplázó	2-es kötés	_St_Dup_2_1_4	Bröndby - FC Könbenhavn	16:00 - Igen (Mindkét csapat szerez gólt)	1.61	2.37
98658d92-2a0a-4765-8db5-74ef604e0b6f	2025-05-04	Vasárnap	Kasza csomag	Duplázó	2-es kötés	_Kas_Dup_2_1_5	Öster - Hammarby	16:30 - Hammarby (1X2)	1.47	2.37
64a67e94-0e93-4483-98fc-25baeb7546e8	2025-05-04	Vasárnap	Kasza csomag	Duplázó	2-es kötés	_Kas_Dup_2_1_5	Bröndby - FC Könbenhavn	16:00 - Igen (Mindkét csapat szerez gólt)	1.61	2.37
08a0864e-bb90-45db-9242-2281583d4ac8	2025-05-04	Vasárnap	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Dup_2_1_6	Öster - Hammarby	16:30 - Hammarby (1X2)	1.47	2.37
8d6229c3-ca9e-47cc-ad9b-52ef3b0cbbb7	2025-05-04	Vasárnap	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Dup_2_1_6	Bröndby - FC Könbenhavn	16:00 - Igen (Mindkét csapat szerez gólt)	1.61	2.37
a734e94e-6490-4527-9f1d-161ef796a8b4	2025-05-04	Vasárnap	Start csomag	Duplázó	2-es kötés	_St_Dup_2_1_7	Montevideo City Torque - Progreso Montevideo	15:45 - Igen (Mindkét csapat szerez gólt)	1.84	2.52
75a0f5fa-9ca5-4fac-aa2a-355456098331	2025-05-04	Vasárnap	Start csomag	Duplázó	2-es kötés	_St_Dup_2_1_7	Szeged GA - Honvéd	17:00 - Több, mint 1,5 (Gólszám 1,5)	1.37	2.52
b75597bc-4e5b-4e96-8294-618ff954c449	2025-05-04	Vasárnap	Kasza csomag	Duplázó	2-es kötés	_Kas_Dup_2_1_8	Montevideo City Torque - Progreso Montevideo	15:45 - Igen (Mindkét csapat szerez gólt)	1.84	2.52
a8a00d8c-4863-405b-be0d-836cded3577f	2025-05-04	Vasárnap	Kasza csomag	Duplázó	2-es kötés	_Kas_Dup_2_1_8	Szeged GA - Honvéd	17:00 - Több, mint 1,5 (Gólszám 1,5)	1.37	2.52
69e02f47-700a-48db-bad9-d5d3298f6112	2025-05-04	Vasárnap	Kaszadella csomag	Duplázó	2-es kötés	20250504_Kdl_Dup_2_12	Montevideo City Torque - Progreso Montevideo	15:45 - Igen (Mindkét csapat szerez gólt)	1.84	2.52
7ae97f3a-c508-4e16-ae2d-1d970cc868be	2025-05-04	Vasárnap	Kaszadella csomag	Duplázó	2-es kötés	20250504_Kdl_Dup_2_12	Szeged GA - Honvéd	17:00 - Több, mint 1,5 (Gólszám 1,5)	1.37	2.52
ff95b51d-0112-4a3e-baa6-3b0118fe8a7a	2025-05-04	Vasárnap	Start csomag	Közepes tipp	2-es kötés	_St_Köz_2_1_10	Südtirol - Cosenza	15:00 - Südtirol (1X2)	1.76	2.75
c489368c-6757-475d-9272-9aaf52267482	2025-05-04	Vasárnap	Start csomag	Közepes tipp	2-es kötés	_St_Köz_2_1_10	Freiburg - Leverkusen	17:30 - Igen (Mindkét csapat szerez gólt)	1.56	2.75
429ebcf5-2e64-4412-b003-9f74929185c2	2025-05-04	Vasárnap	Kasza csomag	Közepes tipp	2-es kötés	_Kas_Köz_2_1_11	Südtirol - Cosenza	15:00 - Südtirol (1X2)	1.76	2.75
15a10e44-8764-465f-bc84-42fa380851d2	2025-05-04	Vasárnap	Kasza csomag	Közepes tipp	2-es kötés	_Kas_Köz_2_1_11	Freiburg - Leverkusen	17:30 - Igen (Mindkét csapat szerez gólt)	1.56	2.75
e26d4eb0-379f-484a-9a4b-d78e11c3b997	2025-05-04	Vasárnap	Kaszadella csomag	Közepes tipp	2-es kötés	_Kdl_Köz_2_1_12	Südtirol - Cosenza	15:00 - Südtirol (1X2)	1.76	2.75
6be9e03a-c382-4cf6-a9d9-b369757a7f0f	2025-05-04	Vasárnap	Kaszadella csomag	Közepes tipp	2-es kötés	_Kdl_Köz_2_1_12	Freiburg - Leverkusen	17:30 - Igen (Mindkét csapat szerez gólt)	1.56	2.75
97967e5b-88c0-4943-831e-1ba9b120bef6	2025-05-04	Vasárnap	Kasza csomag	Közepes tipp	2-es kötés	_Kas_Köz_2_1_13	Viking Stavanger - Sarpsborg	17:00 - Viking Stavanger (1X2)	1.64	2.80
1acbe2aa-e581-4633-9d82-2f131a35b541	2025-05-04	Vasárnap	Kasza csomag	Közepes tipp	2-es kötés	_Kas_Köz_2_1_13	Luzern - Lugano	16:30 - Luzern (Döntetlennél a tét visszajár)	1.71	2.80
ef9c4f38-339d-424f-abd0-bb2ed997c077	2025-05-04	Vasárnap	Kaszadella csomag	Közepes tipp	2-es kötés	_Kdl_Köz_2_1_14	Viking Stavanger - Sarpsborg	17:00 - Viking Stavanger (1X2)	1.64	2.80
3c1778db-59dc-4936-a0d2-ee5ffbe01873	2025-05-04	Vasárnap	Kaszadella csomag	Közepes tipp	2-es kötés	_Kdl_Köz_2_1_14	Luzern - Lugano	16:30 - Luzern (Döntetlennél a tét visszajár)	1.71	2.80
370495a5-b3af-450a-87fa-5429472d3778	2025-05-04	Vasárnap	Kasza csomag	Nagy tipp	2-es kötés	_Kas_Nag_2_1_15	Brighton - Newcastle	15:00 - Newcastle (1X2)	2.05	5.68
114bec89-be5f-4675-9f66-1a50b2ec33f8	2025-05-04	Vasárnap	Kasza csomag	Nagy tipp	2-es kötés	_Kas_Nag_2_1_15	Olympiakosz - PAOK	19:00 - Olympiakosz (1X2)	2.77	5.68
549ef98f-8d0f-4483-afea-7047e4a76757	2025-05-04	Vasárnap	Start csomag	Nagy tipp	2-es kötés	20250504_St_Nag_2_17	Brighton - Newcastle	15:00 - Newcastle (1X2)	2.05	5.68
01b202e5-263b-4640-9c37-c32d840e3b3d	2025-05-04	Vasárnap	Start csomag	Nagy tipp	2-es kötés	20250504_St_Nag_2_17	Olympiakosz - PAOK	19:00 - Olympiakosz (1X2)	2.77	5.68
5e305bd6-141b-466b-89e6-6ffcb0766c24	2025-05-05	Hétfő	Kaszadella csomag	Közepes tipp	2-es kötés	_Kdl_Köz_2_1_4	Girona - Mallorca	21:00 - 9-11 (Szögletek száma)	2.68	4.66
1045e2fb-6b63-4200-822e-18de5023d46d	2025-05-04	Vasárnap	Kaszadella csomag	Nagy tipp	4-es kötés	_Kdl_Nag_4_1_1	Djurgarden - AIK Stockholm	14:00 - AIK Stockholm (Döntetlennél a tét visszajár)	1.82	5.98
0228e785-7041-4ac2-8bb4-24054842713f	2025-05-04	Vasárnap	Kaszadella csomag	Nagy tipp	4-es kötés	_Kdl_Nag_4_1_1	Arka Gdynia - TBB Nieciecza	14:30 - Igen (Mindkét csapat szerez gólt)	1.71	5.98
4d3a9d6d-f5f7-49f3-902f-7da5e3c6f14d	2025-05-04	Vasárnap	Kaszadella csomag	Nagy tipp	4-es kötés	_Kdl_Nag_4_1_1	Brentford - Manchester Utd.	15:00 - Több, mint 2,5 (Büntetőlap-szám 2,5)	1.60	5.98
52b82f25-abc8-4f2f-bfd7-8f79b2d9ea92	2025-05-04	Vasárnap	Kaszadella csomag	Nagy tipp	4-es kötés	_Kdl_Nag_4_1_1	Monza - Atalanta	15:00 - Igen (Mindkét csapat kap büntetőlappot?)	1.20	5.98
5bd63238-7575-4ae9-9012-04c465bbfd1e	2025-05-04	Vasárnap	Kasza csomag	Közepes tipp	2-es kötés	_Kas_Köz_2_1_1	Esenler Erokspor - Istanbulspor	15:00 - Istanbulspor (Döntetlennél a tét visszajár)	1.51	2.97
86b4c8d8-354e-4c42-bd39-a86101b3829f	2025-05-04	Vasárnap	Kasza csomag	Közepes tipp	2-es kötés	_Kas_Köz_2_1_1	Mladá Boleslav - Teplice	15:30 - 2-3 (Gólszám)	1.97	2.97
272cd880-f4a5-4130-aafc-d2d43285d0a5	2025-05-04	Vasárnap	Kaszadella csomag	Közepes tipp	2-es kötés	_Kdl_Köz_2_1_2	Mladá Boleslav - Teplice	15:30 - 2-3 (Gólszám)	1.97	2.97
06b933a9-567c-4b62-a060-9d29c36ccd25	2025-05-04	Vasárnap	Kaszadella csomag	Közepes tipp	2-es kötés	_Kdl_Köz_2_1_2	Esenler Erokspor - Istanbulspor	15:00 - Istanbulspor (Döntetlennél a tét visszajár)	1.51	2.97
fd7ce605-dc52-47a6-a3d5-7ad76385cd83	2025-05-04	Vasárnap	Kaszadella csomag	Duplázó	1-es kötés	_Kdl_Dup_Egyéni_1_1	Fehérvár - Paks	18:30 - Paks (1X2)	2.25	2.25
83e9a5fa-e230-4a61-8ebc-f2b1035e2fbc	2025-05-04	Vasárnap	Kaszadella csomag	Nagy tipp	6-os kötés	_Kdl_Nag_Egyéni_1_1	Kecskemét - Nyíregyháza	16:00 - Igen (Mindkét csapat szerez gólt)	1.71	5.80
5489e4da-b6b7-44a5-8d72-fcef9ca2bba9	2025-05-04	Vasárnap	Kaszadella csomag	Nagy tipp	6-os kötés	_Kdl_Nag_Egyéni_1_1	Brentford - Manchester Utd.	15:00 - Igen (Mindkét csapat szerez gólt)	1.56	5.80
b4176d89-5913-403e-97c3-f5854b0eaf39	2025-05-04	Vasárnap	Kaszadella csomag	Nagy tipp	6-os kötés	_Kdl_Nag_Egyéni_1_1	Chelsea - Liverpool	17:30 - Kevesebb, mint 4,5 (Gólszám 4,5)	1.25	5.80
55ec41e3-c65f-4511-a86a-f523d7ca09da	2025-05-04	Vasárnap	Kaszadella csomag	Nagy tipp	6-os kötés	_Kdl_Nag_Egyéni_1_1	West Ham - Tottenham	15:00 - West Ham vagy Döntetlen (Kétesélyes)	1.25	5.80
d285ef61-ce4f-4a2c-a96f-ef29137c7425	2025-05-04	Vasárnap	Kaszadella csomag	Nagy tipp	6-os kötés	_Kdl_Nag_Egyéni_1_1	Mezőkövesd - Ajka	17:00 - Mezőkövesd vagy Döntetlen (Kétesélyes)	1.19	5.80
ed567dfd-aaba-425a-a6e0-0fca16c38289	2025-05-04	Vasárnap	Kaszadella csomag	Nagy tipp	6-os kötés	_Kdl_Nag_Egyéni_1_1	Békéscsaba - Kisvárda	17:00 - Döntetlen vagy Kisvárda (Kétesélyes)	1.17	5.80
78d7601b-4338-42d4-ab7f-0d5aa3ded07f	2025-05-05	Hétfő	Start csomag	Duplázó	3-as kötés	_St_Dup_3_1_1	Braintree - Rochdale	16:00 - Rochdale (Döntetlennél a tét visszajár)	1.33	2.44
f6168706-67ab-4785-b6a7-d2060fd8e4a3	2025-05-05	Hétfő	Start csomag	Duplázó	3-as kötés	_St_Dup_3_1_1	Brighton N - Arsenal N	17:00 - Több, mint 2,5 (Gólszám 2,5)	1.37	2.44
9a92a8b8-17db-42d2-ae21-7b120cdbb534	2025-05-05	Hétfő	Start csomag	Duplázó	3-as kötés	_St_Dup_3_1_1	UTA Arad - Petrolul Ploiesti	16:30. - Nem (Vendégcsapat kapott gól nélkül játsza le a mérkőzést)	1.34	2.44
91762bff-e5b0-444c-b3c8-c43d7069d21d	2025-05-05	Hétfő	Kasza csomag	Duplázó	3-as kötés	_Kas_Dup_3_1_2	Braintree - Rochdale	16:00 - Rochdale (Döntetlennél a tét visszajár)	1.33	2.44
40da389c-8a4a-4964-b9e9-3ea31aca7cc3	2025-05-05	Hétfő	Kasza csomag	Duplázó	3-as kötés	_Kas_Dup_3_1_2	Brighton N - Arsenal N	17:00 - Több, mint 2,5 (Gólszám 2,5)	1.37	2.44
48d1cb12-24dd-4002-a9ee-e7cc037459a3	2025-05-05	Hétfő	Kasza csomag	Duplázó	3-as kötés	_Kas_Dup_3_1_2	UTA Arad - Petrolul Ploiesti	16:30 - Nem (Vendégcsapat kapott gól nélkül játsza le a mérkőzést)	1.34	2.44
deb18fc9-78a6-4422-b039-9b783b8fd8a1	2025-05-05	Hétfő	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Dup_2_1_3	Braintree - Rochdale	16:00 - Rochdale (Döntetlennél a tét visszajár)	1.33	2.44
e8daa7dc-164d-4a09-b9d3-ac35cb7ed951	2025-05-05	Hétfő	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Dup_2_1_3	Brighton N - Arsenal N	17:00 - Több, mint 2,5 (Gólszám 2,5)	1.37	2.44
b9eb7dd3-ea3d-4c26-8aac-5250abdbf0e9	2025-05-05	Hétfő	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Dup_2_1_3	UTA Arad - Petrolul Ploiesti	16:30 - Nem (Vendégcsapat kapott gól nélkül játsza le a mérkőzést)	1.34	2.44
60ab092e-c7ab-44a7-b605-3e46110b848a	2025-05-05	Hétfő	Start csomag	Duplázó	3-as kötés	_St_Dup_3_1_5	Genoa - Milan	20:45 - 1-3 (Vendégcsapat - Gólszámok)	1.25	2.11
1f6fccc7-8b9c-4a82-b9fc-e432234b8cba	2025-05-05	Hétfő	Start csomag	Duplázó	3-as kötés	_St_Dup_3_1_5	Ajman - Al-Urooba	18:45 - Ajman (Döntetlennél a tét visszajár)	1.36	2.11
cd061169-3798-4ab2-b7f7-4ee5a6f11d1c	2025-05-05	Hétfő	Start csomag	Duplázó	3-as kötés	_St_Dup_3_1_5	Brighton N - Arsenal N	17:00 - Arsenal (1X2)	1.24	2.11
5b880e76-cb01-4c97-8dcd-4caa7b7e8898	2025-05-05	Hétfő	Kasza csomag	Duplázó	3-as kötés	_Kas_Dup_3_1_6	Genoa - Milan	20:45 - 1-3 (Vendégcsapat - Gólszámok)	1.25	2.11
69a8f157-bf84-4294-92e7-4ac4a6250a04	2025-05-05	Hétfő	Kasza csomag	Duplázó	3-as kötés	_Kas_Dup_3_1_6	Ajman - Al-Urooba	18:45 - Ajman (Döntetlennél a tét visszajár)	1.36	2.11
1b99117d-8017-47b5-8bc8-569966adca4e	2025-05-05	Hétfő	Kasza csomag	Duplázó	3-as kötés	_Kas_Dup_3_1_6	Brighton N - Arsenal N	17:00 - Arsenal (1X2)	1.24	2.11
bbd81e22-2c57-4f54-b705-5453f2fdddf2	2025-05-05	Hétfő	Kaszadella csomag	Duplázó	3-as kötés	_Kdl_Dup_3_1_7	Genoa - Milan	20:45 - 1-3 (Vendégcsapat - Gólszámok)	1.25	2.11
4f635adb-1af0-4ddd-9827-40cc8447c873	2025-05-05	Hétfő	Kaszadella csomag	Duplázó	3-as kötés	_Kdl_Dup_3_1_7	Ajman - Al-Urooba	18:45 - Ajman (Döntetlennél a tét visszajár)	1.36	2.11
45205a91-6efe-400f-a79f-abc8fa27fe3b	2025-05-05	Hétfő	Kaszadella csomag	Duplázó	3-as kötés	_Kdl_Dup_3_1_7	Brighton N - Arsenal N	17:00 - Arsenal (1X2)	1.24	2.11
eefa1bbc-569c-4b7e-8c1e-aa63859825b0	2025-05-05	Hétfő	Kasza csomag	Közepes tipp	2-es kötés	_Kas_Köz_2_1_8	Maccabi Herzliya - Hapoel Kfar Saba	18:00 - Maccabi Herzliya (Döntetlennél a tét visszajár)	1.80	3.29
59ae6f44-9d53-44bd-964b-2a9a6bf885f1	2025-05-05	Hétfő	Kasza csomag	Közepes tipp	2-es kötés	_Kas_Köz_2_1_8	Petrojet - Ceramica Cleopatra	16:00 - Igen (Mindkét csapat szerez gólt)	1.83	3.29
0a1f4ccf-d0cb-473c-a6b3-09d300bfbd63	2025-05-05	Hétfő	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Dup_2_1_9	Maccabi Herzliya - Hapoel Kfar Saba	18:00 - Maccabi Herzliya (Döntetlennél a tét visszajár)	1.80	3.29
ecb82c42-c81a-43b4-be10-3f2e8f0d332e	2025-05-05	Hétfő	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Dup_2_1_9	Petrojet - Ceramica Cleopatra	16:00 - Igen (Mindkét csapat szerez gólt)	1.83	3.29
591afa24-31e7-496f-ab5a-9387ae36a205	2025-05-05	Hétfő	Kaszadella csomag	Közepes tipp	2-es kötés	_Kdl_Köz_2_1_4	Genoa - Milan	20:45 - Igen (Mindkét csapat szerez gólt)	1.74	4.66
0c3d474f-bae2-4e07-94f9-c2f1c1b56c74	2025-05-07	Szerda	Start csomag	Duplázó	1-es kötés	_St_Dup_Egyéni_1_1	Paris SG - Arsenal	21:00 - Igen (Mindkét csapat szerez gólt) / Több, mint 8,5 (Szögletszám)	2.12	2.12
90cd4478-b3e0-4350-9bc3-970df502a25a	2025-05-07	Szerda	Kasza csomag	Duplázó	1-es kötés	_Kas_Dup_Egyéni_1_2	Paris SG - Arsenal	21:00 - Igen (Mindkét csapat szerez gólt) / Több, mint 8,5 (Szögletszám)	2.12	2.12
f4431178-9be3-44f4-87a0-d80ce3270cb7	2025-05-07	Szerda	Kaszadella csomag	Duplázó	1-es kötés	_Kdl_Dup_Egyéni_1_3	Paris SG - Arsenal	21:00 - Igen (Mindkét csapat szerez gólt) / Több, mint 8,5 (Szögletszám)	2.12	2.12
0f0d0d67-f778-4878-a494-1a4c57e971b2	2025-05-07	Szerda	Kasza csomag	Közepes tipp	3-as kötés	_Kas_Köz_3_1_4	Al-Nassr - Al-Ittihad (KSA)	20:00 - Igen (Mindkét csapat szerez gólt)	1.35	3.10
e66fe02e-d409-438b-8286-aff5781bb657	2025-05-07	Szerda	Kasza csomag	Közepes tipp	3-as kötés	_Kas_Köz_3_1_4	Apollon Limaszol - Pafosz	18:00 - Döntetlen vagy Pafosz (Kétesélyes)	1.35	3.10
a5e1e09d-6ca0-4b42-8311-83c1fa2d06a3	2025-05-07	Szerda	Kasza csomag	Közepes tipp	3-as kötés	_Kas_Köz_3_1_4	Paris SG - Arsenal	21:00 - Paris SG +1,5 (1. félidő - Szöglet hendikep 1,5)/ 1-3 (Hazai csapat - Gólszámok)	1.70	3.10
456e0444-4b8b-4426-bacb-6f7a07aedf9f	2025-05-07	Szerda	Kaszadella csomag	Nagy tipp	4-es kötés	_Kdl_Nag_4_1_6	Al-Nassr - Al-Ittihad (KSA)	Igen (Mindkét csapat szerez gólt)	1.35	6.02
297d5e26-5ab3-4dfd-bfdf-1d753771248d	2025-05-07	Szerda	Kaszadella csomag	Nagy tipp	4-es kötés	_Kdl_Nag_4_1_6	Apollon Limaszol - Pafosz	18:00 - Igen (Mindkét csapat szerez gólt)	1.76	6.02
80838721-079f-4774-b816-d6c704e630ac	2025-05-07	Szerda	Kaszadella csomag	Nagy tipp	4-es kötés	_Kdl_Nag_4_1_6	Al-Raed - Al-Hilal (KSA)	18:15 - Al-hilal (KSA) (1. félidő - 1X2)	1.49	6.02
b11a2399-2819-40f9-93df-8e994ee50e67	2025-05-07	Szerda	Kaszadella csomag	Nagy tipp	4-es kötés	_Kdl_Nag_4_1_6	AEK Larnaka - Omonia Nicosia	Igen (Mindkét csapat szerez gólt)	1.70	6.02
7642fd44-5b89-463d-ba99-9bb8bcc9f27b	2025-05-06	Kedd	Kasza csomag	Duplázó	2-es kötés	_Kas_Dup_2_1_2	Internazionale - Barcelona	21:00 - Kevesebb, mint 4,5 (Hazai csapat szögletszám 4,5)	1.66	2.11
e4ea5bb4-c0dc-40b4-b898-cca257342bca	2025-05-06	Kedd	Kasza csomag	Duplázó	2-es kötés	_Kas_Dup_2_1_2	Szeptevri Szófia - Slavia Szófia	18:30 - Több, mint 1,5 (Gólszám 1,5)	1.27	2.11
681206d5-4791-4c3a-bbce-2ced3b8c42de	2025-05-06	Kedd	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Dup_2_1_3	Internazionale - Barcelona	21:00 - Kevesebb, mint 4,5 (Hazai csapat szögletszám 4,5)	1.66	2.11
ce2e3ee0-299f-4263-afe9-c42e3fc328e3	2025-05-06	Kedd	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Dup_2_1_3	Szeptevri Szófia - Slavia Szófia	18:30 - Több, mint 1,5 (Gólszám 1,5)	1.27	2.11
d64cc023-e14c-4955-bc29-b1ead2744321	2025-05-06	Kedd	Start csomag	Duplázó	2-es kötés	_St_Dup_2_1_4	Internazionale - Barcelona	21:00 - Barcelona (Ki jut tovább?)	1.65	2.13
6ba65973-41b4-4377-89f4-a84bd322ddb3	2025-05-06	Kedd	Start csomag	Duplázó	2-es kötés	_St_Dup_2_1_4	Meizhou Hakka - Shanghai Shenhua	13:00 - Kevesebb, mint 4,5 (Gólszám 4,5)	1.29	2.13
9ebce098-a258-4298-bd65-265dacf2f299	2025-05-06	Kedd	Kasza csomag	Duplázó	2-es kötés	_Kas_Dup_2_1_5	Internazionale - Barcelona	21:00 - Barcelona (Ki jut tovább?)	1.65	2.13
bbd2c773-125e-4363-87e0-e1f3e5b74a2e	2025-05-06	Kedd	Kasza csomag	Duplázó	2-es kötés	_Kas_Dup_2_1_5	Meizhou Hakka - Shanghai Shenhua	13:00 - Kevesebb, mint 4,5 (Gólszám 4,5)	1.29	2.13
ee78ac83-8f72-428d-b04c-e6e088f1fc35	2025-05-06	Kedd	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Dup_2_1_6	Internazionale - Barcelona	21:00 - Barcelona (Ki jut tovább?)	1.65	2.13
dc4b4b2d-cbc1-4bbb-a23a-9d04b56c5913	2025-05-06	Kedd	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Dup_2_1_6	Meizhou Hakka - Shanghai Shenhua	13:00 - Kevesebb, mint 4,5 (Gólszám 4,5)	1.29	2.13
cfa4fb71-3ffc-4991-8087-e5f9ba5d51ae	2025-05-06	Kedd	Start csomag	Duplázó	2-es kötés	_St_Dup_2_1_1	Internazionale - Barcelona	21:00 - Kevesebb, mint 4,5 (Hazai csapat szögletszám 4,5)	1.66	2.11
ba94ba82-db13-4d54-b595-1a0c610b0e47	2025-05-06	Kedd	Start csomag	Duplázó	2-es kötés	_St_Dup_2_1_1	Szeptevri Szófia - Slavia Szófia	18:30 - Több, mint 1,5 (Gólszám 1,5)	1.27	2.11
9542e2bb-25d2-4926-8188-bcb8eb9ba0b7	2025-05-06	Kedd	Kasza csomag	Közepes tipp	3-as kötés	_Kas_Köz_3_1_1	Internazionale - Barcelona	21:00 - Igen (Mindkét csapat szerez gólt)	1.38	3.45
386148f1-acc8-4f2e-948b-4ff4bf91b454	2025-05-06	Kedd	Kaszadella csomag	Közepes tipp	3-as kötés	_Kdl_Köz_3_1_2	Internazionale - Barcelona	21:00 - Igen (Mindkét csapat szerez gólt)	1.38	3.45
362d3700-edde-4e22-a4b9-a239a9e32790	2025-05-06	Kedd	Kaszadella csomag	Közepes tipp	3-as kötés	_Kdl_Köz_3_1_2	Vasteras SK - Kalmar	19:00 - Nem (Hazai csapat kapott gól nélkül játsza le a mérkőzést?)	1.27	3.45
8abbe2cc-a5be-4cbf-83f8-b55b94b3a9db	2025-05-06	Kedd	Kaszadella csomag	Közepes tipp	3-as kötés	_Kdl_Köz_3_1_2	Stripfing/Weiden - Liefering	18:00 - 2-3 (Gólszám)	1.97	3.45
e257f393-6779-4870-b827-5e745fd4c9ea	2025-05-06	Kedd	Kasza csomag	Közepes tipp	3-as kötés	_Kas_Köz_3_1_1	Vasteras SK - Kalmar	19:00 - Nem (Hazai csapat kapott gól nélkül játsza le a mérkőzést?)	1.27	3.45
85d3f309-184a-4543-9da4-05a6be5c78aa	2025-05-06	Kedd	Kasza csomag	Közepes tipp	3-as kötés	_Kas_Köz_3_1_1	Stripfing/Weiden - Liefering	18:00 - 2-3 (Gólszám)	1.97	3.45
b66c1cfc-fda7-4a91-846e-d584cbd9d161	2025-05-06	Kedd	Kaszadella csomag	Közepes tipp	2-es kötés	_Kdl_Köz_2_1_1	Sierra Leone U20 - Dél-Afrika U20	20:00 - U20Dél-Afrika (Döntetlennél a tét visszajár)	1.56	3.16
f6537fd4-2b81-4968-b4a7-9e5e055bc06e	2025-05-06	Kedd	Kaszadella csomag	Közepes tipp	2-es kötés	_Kdl_Köz_2_1_1	Al-Kuwait - Al-Qadsia	19:10 - Több, mint 2,5 (Gólszám 2,5)	1.36	3.16
d41b7bb9-4594-459c-aabe-94752f7ca434	2025-05-06	Kedd	Kaszadella csomag	Közepes tipp	2-es kötés	_Kdl_Köz_2_1_1	U20 Zambia - U20 Tanzánia	17:00 - Kevesebb, mint 2,5 (Gólszám 2,5)	1.49	3.16
6413d8a6-d67d-4770-bd22-c3900f054c9a	2025-05-07	Szerda	Kaszadella csomag	Közepes tipp	3-as kötés	_Kdl_Köz_3_1_1	Al-Nassr - Al-Ittihad (KSA)	20:00 - Igen (Mindkét csapat szerez gólt)	1.35	3.10
1d42e3f9-297a-4bb6-a24b-4f12de32e7f0	2025-05-07	Szerda	Kaszadella csomag	Közepes tipp	3-as kötés	_Kdl_Köz_3_1_1	Apollon Limaszol - Pafosz	18:00 - Döntetlen vagy Pafosz (Kétesélyes)	1.35	3.10
2ffc5a3e-c6a9-4467-8332-b86df22e4295	2025-05-07	Szerda	Kaszadella csomag	Közepes tipp	3-as kötés	_Kdl_Köz_3_1_1	Paris SG - Arsenal	21:00 - Paris SG +1,5 (1. félidő - Szöglet hendikep 1,5)/ 1-3 (Hazai csapat - Gólszámok)	1.70	3.10
08fd8258-cb43-4769-b869-cfb58b241a56	2025-05-07	Szerda	Start csomag	Duplázó	2-es kötés	_St_Dup_2_1_1	U20 Tunézia - U20Marokkó	17:00 - Nem (Hazai csapat kapott gól nélkül játssza le a mérkőzést)	1.32	2.44
b8cfda45-9897-4287-9dd2-5de671f65738	2025-05-07	Szerda	Start csomag	Duplázó	2-es kötés	_St_Dup_2_1_1	Vyskov - Lisen	17:30 - Igen (Mindkét csapat szerez gólt)	1.85	2.44
217414b4-a409-4a7d-9d0f-413dab71bbdb	2025-05-07	Szerda	Kasza csomag	Duplázó	2-es kötés	_Kas_Dup_2_1_2	U20 Tunézia - U20Marokkó	17:00 - Nem (Hazai csapat kapott gól nélkül játssza le a mérkőzést)	1.32	2.44
1e3315c8-0e3f-40a0-aaf6-879502f7ae53	2025-05-07	Szerda	Kasza csomag	Duplázó	2-es kötés	_Kas_Dup_2_1_2	Vyskov - Lisen	17:30 - Igen (Mindkét csapat szerez gólt)	1.85	2.44
f3fffbc4-9793-4a9d-8b88-5abce02c5c26	2025-05-07	Szerda	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Dup_2_1_3	U20 Tunézia - U20Marokkó	17:00 - Nem (Hazai csapat kapott gól nélkül játssza le a mérkőzést)	1.32	2.44
5677f9cd-31e1-446c-ad62-c46509809af9	2025-05-07	Szerda	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Dup_2_1_3	Vyskov - Lisen	17:30 - Igen (Mindkét csapat szerez gólt)	1.85	2.44
e7053200-9440-4a55-87b9-a5612ccc692c	2025-05-07	Szerda	Kaszadella csomag	Nagy tipp	3-as kötés	_Kdl_Nag_3_1_4	Tromsdalen - Rosenborg	18:00 - Igen (Mindkét csapat szerez gólt)	1.83	5.54
e4c4470a-c093-4cd2-8e74-43e10ec74af4	2025-05-07	Szerda	Kaszadella csomag	Nagy tipp	3-as kötés	_Kdl_Nag_3_1_4	Al-Nassr - Al-Ittihad (KSA)	20:00 - 2+ (1.félidő - Gólszám)	1.88	5.54
b625ddef-2067-4408-855e-1218fe7e821c	2025-05-07	Szerda	Kaszadella csomag	Nagy tipp	3-as kötés	_Kdl_Nag_3_1_4	Sogndal - Kongsvinger	19:00 - Kongsvinger (Ki jut tovább?)	1.61	5.54
e37bed56-649f-4e98-adb7-b9639a70370c	2025-05-08	Csütörtök	Start csomag	Duplázó	1-es kötés	_St_Dup_Egyéni_1_1	Manchester Utd. - Ath. Bilbao	21:00 - Igen (Mindkét csapat szerez gólt)/ Több, mint 0,5 (1.félidő - Büntetőlap-szám 0,5)	2.17	2.17
8a2c9674-f99b-4570-aa9c-ca20346cffe1	2025-05-08	Csütörtök	Kasza csomag	Duplázó	1-es kötés	_Kas_Dup_Egyéni_1_2	Manchester Utd. - Ath. Bilbao	21:00 - Igen (Mindkét csapat szerez gólt)/ Több, mint 0,5 (1.félidő - Büntetőlap-szám 0,5)	2.17	2.17
dc1d2297-71da-4ab5-9cac-666640ae4400	2025-05-08	Csütörtök	Kaszadella csomag	Duplázó	1-es kötés	_Kdl_Dup_Egyéni_1_3	Manchester Utd. - Ath. Bilbao	21:00 - Igen (Mindkét csapat szerez gólt)/ Több, mint 0,5 (1.félidő - Büntetőlap-szám 0,5)	2.17	2.17
7fea5b9b-9af7-4bb7-ba2b-f1414105f6ac	2025-05-08	Csütörtök	Kasza csomag	Közepes tipp	2-es kötés	_Kas_Köz_2_1_4	Chelsea - Djurgarden	21:00 - Több, mint 7,5 (Szögletszám 7,5)/ Djurgarden (Melyik csapat kap több büntetőlapot?)	2.04	2.82
a7922c93-b471-44b7-bd70-f1b832fabbd0	2025-05-08	Csütörtök	Kasza csomag	Közepes tipp	2-es kötés	_Kas_Köz_2_1_4	Fiorentina - Betis	21:00 - Betis (Ki jut tovább?)	1.38	2.82
e6e7b2c4-693d-449e-b782-c2899ea20329	2025-05-08	Csütörtök	Kasza csomag	Duplázó	2-es kötés	_Kas_Köz_2_1_7	Tromsö - KFUM Oslo	18:00 - Tromsö (Döntetlennél a tét visszajár)	1.35	2.05
68916cb3-5edf-4411-be7a-a44a27ce3e86	2025-05-08	Csütörtök	Kaszadella csomag	Nagy tipp	2-es kötés	_Kdl_Nag_2_1_9	Finnország - Montenegró (Kézilabda)	17:30 Kevesebb, mint 29,5 (Vendégcsapat - Gólszám 29,5)	1.87	6.36
5b889a15-d943-422b-ae45-26cc3be3721e	2025-05-08	Csütörtök	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Köz_2_1_8	Tromsö - KFUM Oslo	18:00 - Tromsö (Döntetlennél a tét visszajár)	1.35	2.05
89f3e598-594a-4ca6-9c57-7e6e0df4fd27	2025-05-08	Csütörtök	Kaszadella csomag	Nagy tipp	2-es kötés	_Kdl_Nag_2_1_9	Olaszország - Spanyolország (Kézilabda)	19:00 - Vendégcsapat 6-10 góllal nyer (Nyertes különbség)	3.40	6.36
5ff9429f-a0d9-4295-97e2-1467208cfb21	2025-05-08	Csütörtök	Kaszadella csomag	Közepes tipp	2-es kötés	_Kdl_Köz_2_1_5	Chelsea - Djurgarden	21:00 - (Szögletszám 7,5)/ Djurgarden (Melyik csapat kap több büntetőlapot?)	2.04	2.82
882b59ad-0f5b-4df2-9045-1fbab796349f	2025-05-08	Csütörtök	Kaszadella csomag	Közepes tipp	2-es kötés	_Kdl_Köz_2_1_5	Fiorentina - Betis	21:00 - Betis (Ki jut tovább?)	1.38	2.82
cf131d8d-4b28-43cf-b12a-58796fa2e117	2025-05-08	Csütörtök	Start csomag	Duplázó	2-es kötés	_St_Dup_2_1_6	Fiorentina - Betis	21:00 - Fiorentina vagy Betis (1. félidő - Kétesélyes)	1.52	2.05
a70f6d32-7a74-44f1-8eda-db9ad35fdf7f	2025-05-08	Csütörtök	Start csomag	Duplázó	2-es kötés	_St_Dup_2_1_6	Tromsö - KFUM Oslo	18:00 - Tromsö (Döntetlennél a tét visszajár)	1.35	2.05
850e00eb-a545-4b63-b7c6-9d0f05ee2329	2025-05-08	Csütörtök	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Köz_2_1_8	Fiorentina - Betis	21:00 - Fiorentina vagy Betis (1. félidő - Kétesélyes)	1.52	2.05
9b88b47f-5413-4330-86b2-3610fa05137a	2025-05-08	Csütörtök	Kaszadella csomag	Közepes tipp	2-es kötés	_Kdl_Köz_2_1_10	Finnország - Montenegró (Kézilabda)	17:30 - Kevesebb, mint 29,5 (Vendégcsapat - Gólszám 29,5)	1.87	3.57
11b8c93c-8d3f-4122-bd31-423ba9ae673c	2025-05-08	Csütörtök	Kaszadella csomag	Közepes tipp	2-es kötés	_Kdl_Köz_2_1_10	Havadar Teheran - Sepahan	18:00 - 2-3 (Gólszám)	1.91	3.57
16530420-cb0f-45b1-9eb7-53eb9e454042	2025-05-08	Csütörtök	Kasza csomag	Duplázó	2-es kötés	_Kas_Köz_2_1_7	Fiorentina - Betis	21:00 - Fiorentina vagy Betis (1. félidő - Kétesélyes)	1.52	2.05
57436ba8-b21a-4ef8-b787-bfafc8e0cc73	2025-05-08	Csütörtök	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Dup_2_1_11	U20Közép-afrikai Köztársaság - U20Ghána	17:00 - U20Ghána (1X2)	1.60	2.19
0a02718f-6272-49f4-bc24-e12095564970	2025-05-08	Csütörtök	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Dup_2_1_11	U20 Szengeál - U20Kongói DK	17:00 - Több, mint 1,5 (Gólszám 1,5)	1.37	2.19
8b5f1805-7942-4ffc-b4bf-dae514796234	2025-05-09	Péntek	Kasza csomag	Duplázó	3-as kötés	_Kas_Dup_3_1_5	Sturm Graz - Salzburg	19:30 Nem (Vendégcsapat kapott gól nélkül játssza le a mérkőzést)	1.24	2.17
768cceb0-fe5f-44fe-bddf-0f1e617de0b4	2025-05-09	Péntek	Kasza csomag	Duplázó	3-as kötés	_Kas_Dup_3_1_5	Milan - Bologna	20:45 Nem (Vendégcsapat kapott gól nélkül játssza le a mérkőzést)	1.26	2.17
aa36603f-a32f-4417-a7a3-a9f054fadc6e	2025-05-09	Péntek	Kasza csomag	Duplázó	3-as kötés	_Kas_Dup_3_1_5	Western Utd. - Adelaide Utd.	11:35 Western Utd. (Ki jut tovább?)	1.39	2.17
59859908-6fb4-4083-9b6e-f09c5776ffdf	2025-05-09	Péntek	Kasza csomag	Közepes tipp	4-es kötés	_Kas_Köz_4_1_9	FAC Wien - Horn	18:00 - FAC Wien (Döntetlennél a tét visszajár)	1.31	2.88
cc5e4849-351f-4b1e-a8ba-2b7cfc0d7278	2025-05-09	Péntek	Kasza csomag	Közepes tipp	4-es kötés	_Kas_Köz_4_1_9	Modena - Brescia	20:30 - Nem (Vendégcsapat kapott gól nélkül játssza le a mérkőzést)	1.31	2.88
da149fac-6c84-43b1-a815-b97fefdc98b9	2025-05-09	Péntek	Kasza csomag	Közepes tipp	4-es kötés	_Kas_Köz_4_1_9	Cork City - Derry City	20:45 - Nem (Hazai csapat kapott gól nélkül játssza le a mérkőzést)	1.20	2.88
dce23cc0-ab61-41d5-9ab4-8cfaaa26e3ee	2025-05-09	Péntek	Start csomag	Duplázó	3-as kötés	_St_Dup_3_1_8	Sturm Graz - Salzburg	19:30 - Nem (Vendégcsapat kapott gól nélkül játssza le a mérkőzést)	1.24	2.17
461e7e1a-d2af-40db-ae37-0ba14fb283a7	2025-05-09	Péntek	Kaszadella csomag	Duplázó	3-as kötés	_Kdl_Dup_3_1_1	Puskás Akadémia - DVSC	14:30 - Puskás Akadémia vagy Döntetlen (Kétesély)	1.19	2.13
d036857a-c1d4-40b1-b730-080e2bfa5993	2025-05-09	Péntek	Kaszadella csomag	Duplázó	3-as kötés	_Kdl_Dup_3_1_1	Paks - FTC	19:30 - Igen (Mindkét csapat szerez gólt)	1.49	2.13
7895cc7d-66d9-4d38-b9a2-a5436cb6105c	2025-05-09	Péntek	Kaszadella csomag	Duplázó	3-as kötés	_Kdl_Dup_3_1_1	Southampton - Manchester City	16:00 - Több, mint 1,5 (Vendégcsapat -Gólszám 1,5)	1.20	2.13
fd3a2141-031b-4436-a5b9-5a23b8d98c17	2025-05-09	Péntek	Kaszadella csomag	Duplázó	3-as kötés	_Kdl_Dup_3_1_1_2	Milan - Bologna	20:45 - Nem (Vendégcsapat kapott gól nélkül játssza le a mérkőzést)	1.39	2.40
3b817386-a921-42af-a8da-e3b2805a7db4	2025-05-09	Péntek	Kaszadella csomag	Közepes tipp	4-es kötés	_Kdl_Köz_4_1_1	Feirense - Mafra	21:15 - Feirense (Döntetlennél a tét visszajár)	1.40	2.88
5422dc9f-223d-46cc-be0f-dc986169c13f	2025-05-09	Péntek	Kaszadella csomag	Közepes tipp	4-es kötés	_Kdl_Köz_4_1_1	FAC Wien - Horn	18:00 - FAC Wien (Döntetlennél a tét visszajár)	1.31	2.88
93577d56-5018-4203-ae22-6ec7c9e55792	2025-05-09	Péntek	Kaszadella csomag	Közepes tipp	4-es kötés	_Kdl_Köz_4_1_1	Modena - Bresica	20:30 - Nem (Vendégcsapat kapott gól nélkül játssza le a mérkőzést)	1.31	2.88
5bdf66e5-7d08-4438-8e07-17fb603cb943	2025-05-09	Péntek	Kaszadella csomag	Duplázó	3-as kötés	_Kdl_Dup_3_1_1_2	Sturm Graz - Salzburg	19:30 - Nem (Vendégcsapat kapott gól nélkül játssza le a mérkőzést)	1.24	2.40
3ef458a6-8470-4acb-a4dd-fcd568cc32f3	2025-05-09	Péntek	Kaszadella csomag	Duplázó	3-as kötés	_Kdl_Dup_3_1_1_2	Western Utd. - Adelaide Utd.	11:35 - Western Utd. (Ki jut tovább?)	1.39	2.40
67571ec0-0d06-49c8-a6dd-460c3fa891a5	2025-05-09	Péntek	Kasza csomag	Közepes tipp	4-es kötés	_Kas_Köz_4_1_9	Feirense - Mafra	21:15 - Feirense (Döntetlennél a tét visszajár)	1.40	2.88
d0a980d9-0d73-481e-aa0b-2c80585bfb67	2025-05-09	Péntek	Start csomag	Duplázó	3-as kötés	_St_Dup_3_1_8	Milan - Bologna	20:45 - Nem (Vendégcsapat kapott gól nélkül játssza le a mérkőzést)	1.26	2.17
995cf2af-28a3-45b5-8ce6-a17bd212c42c	2025-05-09	Péntek	Start csomag	Duplázó	3-as kötés	_St_Dup_3_1_8	Western Utd. - Adelaide Utd.	11:35 - Western Utd. (Ki jut tovább?)	1.39	2.17
0d41fe15-e807-4b68-8865-116eba6feb85	2025-05-09	Péntek	Start csomag	Duplázó	3-as kötés	_St_Dup_3_1_7	Puskás Akadémia - DVSC	14:30 - Puskás Akadémia vagy Döntetlen (Kétesély)	1.19	2.13
065d2621-fa58-495d-bb6a-99c76f1aac24	2025-05-09	Péntek	Start csomag	Duplázó	3-as kötés	_St_Dup_3_1_7	Paks - FTC	19:30 - Igen (Mindkét csapat szerez gólt)	1.49	2.13
595d1ee4-400c-40a4-a376-fc96347ff3e2	2025-05-09	Péntek	Start csomag	Duplázó	3-as kötés	_St_Dup_3_1_7	Southampton - Manchester City	16:00 - Több, mint 1,5 (Vendégcsapat -Gólszám 1,5)	1.20	2.13
6cd8bfc7-edf1-4629-b8b1-dabc2ff540db	2025-05-09	Péntek	Kasza csomag	Duplázó	3-as kötés	_Kas_Dup_3_1_6	Puskás Akadémia - DVSC	14:30 - Puskás Akadémia vagy Döntetlen (Kétesély)	1.19	2.13
1fe95427-acba-434a-87f7-08eca8092e6d	2025-05-09	Péntek	Kasza csomag	Duplázó	3-as kötés	_Kas_Dup_3_1_6	Paks - FTC	19:30 - Igen (Mindkét csapat szerez gólt)	1.49	2.13
9035046e-7c2d-44dc-a0f2-7426084ad058	2025-05-09	Péntek	Kasza csomag	Duplázó	3-as kötés	_Kas_Dup_3_1_6	Southampton - Manchester City	16:00 - Több, mint 1,5 (Vendégcsapat -Gólszám 1,5)	1.20	2.13
eb7d7876-9382-4283-b71e-83960e05e9cd	2025-05-09	Péntek	Kaszadella csomag	Közepes tipp	4-es kötés	_Kdl_Köz_4_1_4	Feirense - Mafra	21:15 - Feirense (Döntetlennél a tét visszajár)	1.40	2.88
ef694337-9f26-4938-a7f2-ad378f814aa2	2025-05-09	Péntek	Kaszadella csomag	Közepes tipp	4-es kötés	_Kdl_Köz_4_1_4	FAC Wien - Horn	18:00 - FAC Wien (Döntetlennél a tét visszajár)	1.31	2.88
ff80a27a-0da0-4b17-9952-0547164f1b39	2025-05-09	Péntek	Kaszadella csomag	Közepes tipp	4-es kötés	_Kdl_Köz_4_1_4	Modena - Brescia	20:30 - Nem (Vendégcsapat kapott gól nélkül játssza le a mérkőzést)	1.31	2.88
4c0b5585-836f-4a0b-aec2-468439dbf619	2025-05-09	Péntek	Kaszadella csomag	Közepes tipp	4-es kötés	_Kdl_Köz_4_1_4	Cork City - Derry City	20:45 - Nem (Hazai csapat kapott gól nélkül játssza le a mérkőzést)	1.20	2.88
4a029f5a-0299-4df6-9db6-e678a3e384b9	2025-05-09	Péntek	Kaszadella csomag	Duplázó	3-as kötés	_Kdl_Dup_3_1_3	Western Utd. - Adelaide Utd.	11:35 - Western Utd. (Ki jut tovább?)	1.39	2.17
83b56822-68d4-4218-ada6-6fa1bf6ab80e	2025-05-09	Péntek	Kaszadella csomag	Duplázó	3-as kötés	_Kdl_Dup_3_1_3	Milan - Bologna	20:45 - Nem (Vendégcsapat kapott gól nélkül játssza le a mérkőzést)	1.26	2.17
f01cc78e-5e34-473a-8fa5-ccfd3786ddbd	2025-05-09	Péntek	Kaszadella csomag	Duplázó	3-as kötés	_Kdl_Dup_3_1_3	Sturm Graz - Salzburg	19:30 - Nem (Vendégcsapat kapott gól nélkül játssza le a mérkőzést)	1.24	2.17
cadc7892-a3c8-4a6c-908f-10fd67e54f5a	2025-05-09	Péntek	Kaszadella csomag	Közepes tipp	Egyes kötés	_Kdl_Köz_Egyéni_1_2	Southampton - Manchester City	16:00 - Több, mint 7,5 (Szögletszám 7,5),   Több, mint 0,5 (1. félidő - Büntetőlap-szám 0,5),   Manchester City (1. félidő - 1X2)	2.72	2.72
a01f80c3-0660-4ad0-9233-2fe0b0066075	2025-05-09	Péntek	Kaszadella csomag	Közepes tipp	4-es kötés	_Kdl_Köz_4_1_1	Cork City - Derry City	20:45 - Nem (Vendégcsapat kapott gól nélkül játssza le a mérkőzést)	1.20	2.88
1af98f1f-a953-459e-8ddd-57544b6129a3	2025-05-11	Vasárnap	Start csomag	Duplázó	2-es kötés	_St_Dup_2_1_1	Deportivo La Coruna N - Sevilla N	12:00 - Sevilla (Döntetlennél a tét visszajár)	1.84	2.30
e6d36063-d4b3-436b-9027-faa79918b773	2025-05-11	Vasárnap	Start csomag	Duplázó	2-es kötés	_St_Dup_2_1_1	ZTE - Újpest	13:00 - Több, mint 1,5 (Gólszám 1,5)	1.25	2.30
6e699f16-8a77-44ec-bdda-4db05ee08405	2025-05-11	Vasárnap	Kasza csomag	Duplázó	2-es kötés	_Kas_Dup_2_1_2	Deportivo La Coruna N - Sevilla N	12:00 - Sevilla (Döntetlennél a tét visszajár)	1.84	2.30
3a4945a0-50dd-4e94-8397-88b29c5b19a0	2025-05-11	Vasárnap	Kasza csomag	Duplázó	2-es kötés	_Kas_Dup_2_1_2	ZTE - Újpest	13:00 - Több, mint 1,5 (Gólszám 1,5)	1.25	2.30
f344565b-03bd-437f-a5a4-114b0ff06e6d	2025-05-11	Vasárnap	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Dup_2_1_3	Deportivo La Coruna N - Sevilla N	12:00 - Sevilla (Döntetlennél a tét visszajár)	1.84	2.30
17f638c8-8261-4529-b7a9-8a27c08d083d	2025-05-11	Vasárnap	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Dup_2_1_3	ZTE - Újpest	13:00 - Több, mint 1,5 (Gólszám 1,5)	1.25	2.30
d97e15ee-fea8-4256-8dfc-558e07b9fd91	2025-05-11	Vasárnap	Start csomag	Duplázó	2-es kötés	_St_Dup_2_1_4	ZTE - Újpest	13:00 - ZTE (Döntetlennél a tét visszajár)	1.54	2.14
bd5b8937-c324-4a2a-a5ca-ce2a1b416295	2025-05-11	Vasárnap	Start csomag	Duplázó	2-es kötés	_St_Dup_2_1_4	Leganes - Espanyol	14:00 - Több, mint 1,5 (Gólszám 1,5)	1.39	2.14
319ac116-d5ca-48e2-a2ae-83e30f71a046	2025-05-11	Vasárnap	Start csomag	Duplázó	2-es kötés	20250511_St_Dup_2_6	ZTE - Újpest	13:00 - ZTE (Döntetlennél a tét visszajár)	1.54	2.14
280f27f9-d073-4ae7-9752-9412dc2b5c36	2025-05-11	Vasárnap	Start csomag	Duplázó	2-es kötés	20250511_St_Dup_2_6	Leganes - Espanyol	14:00 - Több, mint 1,5 (Gólszám 1,5)	1.39	2.14
b539e1c7-cdee-4cd3-b04a-c5f955647d38	2025-05-11	Vasárnap	Kasza csomag	Duplázó	2-es kötés	_Kas_Dup_2_1_6	ZTE - Újpest	13:00 - ZTE (Döntetlennél a tét visszajár)	1.54	2.14
88bab547-3a7d-4c8c-9814-1884e9c7afb5	2025-05-11	Vasárnap	Kasza csomag	Duplázó	2-es kötés	_Kas_Dup_2_1_6	Leganes - Espanyol	14:00 - Több, mint 1,5 (Gólszám 1,5)	1.39	2.14
34cf7002-542e-4090-bc89-44beaf10e495	2025-05-11	Vasárnap	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Dup_2_1_7	ZTE - Újpest	13:00 - ZTE (Döntetlennél a tét visszajár)	1.54	2.14
15dd2161-04b3-444f-90bf-44329ffcf145	2025-05-11	Vasárnap	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Dup_2_1_7	Leganes - Espanyol	14:00 - Több, mint 1,5 (Gólszám 1,5)	1.39	2.14
0b85c39d-624d-40a3-95ce-85d709615e82	2025-05-11	Vasárnap	Kasza csomag	Közepes tipp	2-es kötés	_Kas_Köz_2_1_8	Feyenoord - PSV	14:30 - Vendég és több (1X2 + 1,5)	2.50	4.80
e3eef241-d034-49d9-9f7f-13bd97a9f10f	2025-05-11	Vasárnap	Kasza csomag	Közepes tipp	2-es kötés	_Kas_Köz_2_1_8	Tondela - Alverca	05:00 - 2.3 (Gólszám)	1.92	4.80
1e31c539-aa7e-45d4-b9bd-e4e1ebfa91bd	2025-05-11	Vasárnap	Kaszadella csomag	Közepes tipp	2-es kötés	_Kdl_Köz_2_1_9	Feyenoord - PSV	14:30 - Vendég és több (1X2 + 1,5)	2.50	4.80
edae7c2d-7f4f-4732-9db1-e54cfbced368	2025-05-11	Vasárnap	Kaszadella csomag	Közepes tipp	2-es kötés	_Kdl_Köz_2_1_9	Tondela - Alverca	05:00 - 2.3 (Gólszám)	1.92	4.80
d700f2c6-ce2e-4118-8d6a-8de819e6782c	2025-05-11	Vasárnap	Kaszadella csomag	Nagy tipp	2-es kötés	_Kdl_Nag_2_1_10	Barcelona - Real Madrid	16:15 - Pedri 1+ (kedzőként hány gólasszt ad?)	4.65	5.77
ac48343d-2312-45d1-ba06-c3d701077569	2025-05-11	Vasárnap	Kaszadella csomag	Nagy tipp	2-es kötés	_Kdl_Nag_2_1_10	BVSC - Kozármisleny	17:00 - Több, mint 1,5 (Gólszám 1,5)	1.24	5.77
91d16fef-21b6-4793-9ffe-7229b9620d67	2025-05-11	Vasárnap	Kaszadella csomag	Nagy tipp	2-es kötés	_Kdl_Nag_2_1_11	Barcelona - Real Madrid	16:15 - Pedri 1+ (kedzőként hány gólasszt ad?)	4.65	5.77
bd0a00f5-e7d8-4cfc-be03-7b17fd9b0014	2025-05-11	Vasárnap	Kaszadella csomag	Nagy tipp	2-es kötés	_Kdl_Nag_2_1_11	BVSC - Kozármisleny	17:00 - Több, mint 1,5 (Gólszám 1,5)	1.24	5.77
6c1ddbb0-2bcc-456c-9df7-fa5cc3e81270	2025-05-11	Vasárnap	Kasza csomag	Közepes tipp	2-es kötés	_Kas_Köz_2_1_12	TBB Nieciecza - Gornik Leczna	14:30 - 2-3 (Gólszám)	1.95	3.86
4870d8e3-64f4-4fe7-80a1-3bf528790fd2	2025-05-11	Vasárnap	Kasza csomag	Közepes tipp	2-es kötés	_Kas_Köz_2_1_12	GKS Katowice - Cracovia Krakkó	14:45 - 2-3 (Gólszám)	1.98	3.86
f8f40301-222d-4f09-9724-8c9c7dcc3942	2025-05-11	Vasárnap	Kaszadella csomag	Közepes tipp	2-es kötés	_Kdl_Köz_2_1_13	TBB Nieciecza - Gornik Leczna	14:30 - 2-3 (Gólszám)	1.95	3.86
65848f7b-b813-4f0e-973c-d08cd3b9f96a	2025-05-11	Vasárnap	Kaszadella csomag	Közepes tipp	2-es kötés	_Kdl_Köz_2_1_13	GKS Katowice - Cracovia Krakkó	14:45 - 2-3 (Gólszám)	1.98	3.86
1279601a-198e-495f-85cc-37db4b89dd51	2025-05-11	Vasárnap	Kaszadella csomag	Nagy tipp	3-as kötés	_Kdl_Nag_3_1_14	Barcelona - Real Madrid	16:15 - Több, mint 6,5 (Büntetőlap-szám 6,5)	1.66	8.23
6f6852a3-920f-457c-ab45-42fa56677e45	2025-05-11	Vasárnap	Kaszadella csomag	Nagy tipp	3-as kötés	_Kdl_Nag_3_1_14	Tottenham - Crystal Palace	15:15 - Tottenham (Döntetlennél a tét visszajár)	1.87	8.23
97542cc7-bd78-4856-b38f-7b48102f8985	2025-05-11	Vasárnap	Kaszadella csomag	Nagy tipp	3-as kötés	_Kdl_Nag_3_1_14	Manchester Utd. - West Ham	15:15 - 3-4 (Vendégcsapat szögleteinek száma)	2.65	8.23
08d70e1c-538f-4b7e-9f8c-c024b1b2727f	2025-05-11	Vasárnap	Kaszadella csomag	Extra hétvégi	4-es kötés	_Kdl_Ext_4_1_15	Real Sociedad B - Ponferradina	17:30 - Real Sociedad B (Döntetlennél a tét visszajár)	1.80	15.65
35c08d1a-06d6-496b-851d-523021ab79c5	2025-05-11	Vasárnap	Kaszadella csomag	Extra hétvégi	4-es kötés	_Kdl_Ext_4_1_15	Eldense - Malaga	18:30 - 0-1 (Gólszám)	2.83	15.65
703a71ca-c849-4030-b840-39b28d68426d	2025-05-11	Vasárnap	Kaszadella csomag	Extra hétvégi	4-es kötés	_Kdl_Ext_4_1_15	Damac - Al-Raed	18:10 - 2-3 (Gólszám)	1.92	15.65
3867593b-ad20-4b61-bbe9-334b74a50ebd	2025-05-11	Vasárnap	Kaszadella csomag	Extra hétvégi	4-es kötés	_Kdl_Ext_4_1_15	Vasas - Békéscsaba	19:00 - Hazai és kevesebb (1X2 + Gólszám 4,5)	1.60	15.65
852519c7-5790-49b2-bc39-c9e910f29341	2025-05-11	Vasárnap	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Dup_2_1_1	Kaszima A. - Kawasaki Frontale	13:00 - Kashima A. (Döntetlennél a tét visszajár)	1.89	2.97
de8cf339-d51d-4028-9082-3407acbba732	2025-05-11	Vasárnap	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Dup_2_1_1	Liverpool - Arsenal	17:30 - Igen (Mindkét csapat szerez gólt)	1.57	2.97
3069f8a7-7b78-490b-a33d-ae24a6b4128c	2025-05-11	Vasárnap	Kaszadella csomag	Közepes tipp	2-es kötés	_Kdl_Köz_2_1_2	Wolfsberg - BW Linz	14:30 - Wolfsberg (1X2)	1.52	3.28
b02764c8-9bde-4ad4-9c8e-fd8bb9255e45	2025-05-11	Vasárnap	Kaszadella csomag	Közepes tipp	2-es kötés	_Kdl_Köz_2_1_2	Kalamar - Trelleborg	15:00 - Kalmar (1X2)	1.47	3.28
fc20809c-52bd-486e-86d0-d8fce7e5fc19	2025-05-11	Vasárnap	Kaszadella csomag	Közepes tipp	2-es kötés	_Kdl_Köz_2_1_2	Genk - FC Bruges	18:30 - FC Bruges (Döntetlennél a tét visszajár)	1.47	3.28
05c49f55-d13a-4df5-83a3-f4c462a7e9da	2025-05-11	Vasárnap	Kaszadella csomag	Nagy tipp	2-es kötés	_Kdl_Nag_2_1_3	Newcastle - Chelsea	13:00 - Igen (Mindkét csapat szerez gólt)	1.47	5.30
4c5b846a-eabe-4db0-897c-841edd69220f	2025-05-11	Vasárnap	Kaszadella csomag	Nagy tipp	2-es kötés	_Kdl_Nag_2_1_3	Öster - Elfsborg	16:30 - Elfsborg (1X2)	1.64	5.30
80e2ab41-7a59-4cec-b0ab-48fd283088d6	2025-05-11	Vasárnap	Kaszadella csomag	Nagy tipp	2-es kötés	_Kdl_Nag_2_1_3	PAOK - AEK Athén	19:00 - PAOK (1X2)	1.73	5.30
4774e489-f8c5-40b4-ac3c-9cf385975b6c	2025-05-11	Vasárnap	Kaszadella csomag	Nagy tipp	2-es kötés	_Kdl_Nag_2_1_3	Crvena zvezda - Vojvodina	19:00 - Crvena zvezda (1X2)	1.27	5.30
d0c47282-e25c-4d90-82b4-f2a5c86c1d66	2025-05-11	Vasárnap	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Dup_2_1_4	ZTE - Újpest	13:00 - Igen (Mindkét csapat szerez gólt)	1.62	2.49
e6b7ae9d-2271-47fb-b4f5-e7a45b32ad42	2025-05-11	Vasárnap	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Dup_2_1_4	Nyíregyháza - Diósgyőr	15:30 - Igen (Mindkét csapat szerez gólt)	1.54	2.49
ba6df8d8-23f3-4bac-82a0-872ed29da22f	2025-05-12	Hétfő	Kaszadella csomag	Duplázó	3-as kötés	_Kdl_Dup_3_1_1	Hapoel TA - Maccabi Herzliya	18:00 - Hapoel TA (1X2)	1.23	2.03
445dbf69-b423-4c31-883d-b083a15ed739	2025-05-12	Hétfő	Kaszadella csomag	Duplázó	3-as kötés	_Kdl_Dup_3_1_1	Hapoel Petah Tikva - Hapoel Rishon Lezion	18:00 - Hapoel Petah Tikva (1X2)	1.32	2.03
44a6d42b-b783-4dd9-8409-af2f1afe9f2b	2025-05-12	Hétfő	Kaszadella csomag	Duplázó	3-as kötés	_Kdl_Dup_3_1_1	Hapoel Beer Sheva - Maccabi Haifa	19:30 - Hapoel Beer Sheva (1X2)	1.25	2.03
d462af58-cfa0-4531-a8f3-52cee1641e53	2025-05-12	Hétfő	Kaszadella csomag	Közepes tipp	2-es kötés	_Kdl_Dup_2_1_2	Venezia - Fiorentina	18:30 - Fiorentina (Döntetlennél a tét visszajár)	1.70	2.60
c761fed6-e898-4436-87a4-8f03432deec8	2025-05-12	Hétfő	Kaszadella csomag	Közepes tipp	2-es kötés	_Kdl_Dup_2_1_2	Zelenicar Pancevo - Napredak Krusevac	20:00 - Zelenicar Pancevo (Döntetlennél a tét visszajár)	1.53	2.60
38b330d2-56a1-44c2-a61b-869a948048e1	2025-05-12	Hétfő	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Dup_2_1_1	Venezia - Fiorentina	18:30 - Döntetlen vagy Fiorentina (Kétesélyes)/ Fiorentina +0,5 (Szöglet hendikep -0,5)	2.22	2.22
8994d87e-f7c9-4882-a6d3-2cc82a4e13df	2025-05-12	Hétfő	Kaszadella csomag	Nagy tipp	5-ös kötés	_Kdl_Nag_Egyéni_1_3	Al-Akhood - Al-Nassr	20:00 - Al-Nassr (1.félidő 1X2)/ Több, mint 0,5 (1.félidő - Gólszám 0,5)	1.86	5.00
b3857701-f9d5-403e-9f4e-fb5c0cde19c7	2025-05-12	Hétfő	Kaszadella csomag	Nagy tipp	5-ös kötés	_Kdl_Nag_Egyéni_1_3	Dibba-Al-Hisn - Al-Wahda (UAE)	16:10 - Al-Wahda(UAE) (1X2)	1.45	5.00
d1e6e9fb-b63d-4010-9d96-5881e08e2e9a	2025-05-12	Hétfő	Kaszadella csomag	Nagy tipp	5-ös kötés	_Kdl_Nag_Egyéni_1_3	Seinajoen JK - Vaasa PS	18:00 - Seinajoen JK vagy Döntetlen (Kétesélyes)	1.24	5.00
632de5e0-b000-446a-9306-bf47bcdf15de	2025-05-12	Hétfő	Kaszadella csomag	Nagy tipp	5-ös kötés	_Kdl_Nag_Egyéni_1_3	Skeid - Lilleström	19:00 - Lilleström (1X2)	1.29	5.00
9a76de8f-32a6-470e-94c6-da125d267416	2025-05-12	Hétfő	Kaszadella csomag	Nagy tipp	5-ös kötés	_Kdl_Nag_Egyéni_1_3	Aalesund -Bodö/Glimt	19:00 - Bodö/Glimt (Ki jut tovább?)	1.16	5.00
87cb3942-06cc-4a1b-b18b-792633d233c2	2025-05-12	Hétfő	Kaszadella csomag	Közepes tipp	2-es kötés	_Kdl_Köz_2_1_2	Sheffield Utd. - Bristol City	21:00 - Igen (Mindkét csapat szerez gólt)	1.83	2.93
20c97aa5-ba39-4150-846b-07cf504ea777	2025-05-12	Hétfő	Kaszadella csomag	Közepes tipp	2-es kötés	_Kdl_Köz_2_1_2	Al-Okhood - Al-Nassr	20:00 - Igen (Cristiano Ronaldo szerez gólt kezdőként?)	1.60	2.93
20b8f62e-1cd4-4cfd-8009-b3b60d9e094d	2025-05-13	Kedd	Start csomag	Duplázó	2-es kötés	_St_Dup_2_1_1	Sassuolo - Frosinone	20:30 - Több, mint 0,5 (Hazai csapat - Gólszám 0,5)	1.30	2.24
f5be74a5-92c3-4265-9d08-29286af559c7	2025-05-13	Kedd	Start csomag	Duplázó	2-es kötés	_St_Dup_2_1_1	Real Sociedad - Celta Vigo	20:00 - Igen (Mindkét csapat szerez gólt)	1.72	2.24
f569845e-a360-4171-bc33-29f3168a0ee0	2025-05-13	Kedd	Kasza csomag	Duplázó	2-es kötés	_Kas_Dup_2_1_2	Sassuolo - Frosinone	20:30 - Több, mint 0,5 (Hazai csapat - Gólszám 0,5)	1.30	2.24
1a235f04-7d8c-4de1-845c-02a67f418de0	2025-05-13	Kedd	Kasza csomag	Duplázó	2-es kötés	_Kas_Dup_2_1_2	Real Sociedad - Celta Vigo	20:00 - Igen (Mindkét csapat szerez gólt)	1.72	2.24
e7abc178-86ca-4173-b65b-227c20766799	2025-05-13	Kedd	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Dup_2_1_3	Sassuolo - Frosinone	20:30 - Több, mint 0,5 (Hazai csapat - Gólszám 0,5)	1.30	2.24
3fcaeeb2-1713-4ec3-a4db-2b975ca5772a	2025-05-13	Kedd	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Dup_2_1_3	Real Sociedad - Celta Vigo	20:00 - Igen (Mindkét csapat szerez gólt)	1.72	2.24
a84a975f-3f42-4871-b2e7-04c297000a03	2025-05-13	Kedd	Start csomag	Duplázó	2-es kötés	_St_Dup_2_1_4	Valladolid - Ginora	19:00 - Nem (Vendég csapat kapott gól nélkül játssza le a mérkőzést)	1.54	2.03
052c6deb-b055-4685-b24e-23d79da773fb	2025-05-13	Kedd	Start csomag	Duplázó	2-es kötés	_St_Dup_2_1_4	Lanus - Vasco de Gama RJ	(05.14) 02:30 - Lanus (Döntetlennél a tét visszajár)	1.32	2.03
6dac140d-476d-478a-b653-9f0e410d9a4b	2025-05-13	Kedd	Kasza csomag	Duplázó	2-es kötés	_Kas_Dup_2_1_5	Valladolid - Ginora	19:00 - Nem (Vendég csapat kapott gól nélkül játssza le a mérkőzést)	1.54	2.03
fa7d248b-e6bc-47c7-968e-ed4bea089a47	2025-05-13	Kedd	Kasza csomag	Duplázó	2-es kötés	_Kas_Dup_2_1_5	Lanus - Vasco de Gama RJ	(05.14) 02:30 - Lanus (Döntetlennél a tét visszajár)	1.32	2.03
7b2b88d4-d628-4f7e-9aef-cf5bc297e68f	2025-05-13	Kedd	Kasza csomag	Közepes tipp	2-es kötés	_Kas_Köz_2_1_8	Sunderland - Coventry	21:00 - Igen (Mindkét csapat szerez gólt)	1.73	2.58
0d23cf93-0471-494e-9c94-23eca075e95d	2025-05-13	Kedd	Kasza csomag	Közepes tipp	2-es kötés	_Kas_Köz_2_1_8	Sassuolo - Frosinone	20:30 - Sassuolo vagy Döntetelen (Kétesélyes)	1.49	2.58
99087ef8-14f7-4f6d-a9e1-cc0106517a8d	2025-05-13	Kedd	Kaszadella csomag	Közepes tipp	2-es kötés	_Kdl_Köz_2_1_9	Sunderland - Coventry	21:00 - Igen (Mindkét csapat szerez gólt)	1.73	2.58
01e162f5-9df5-404d-8bbd-1ee98277773c	2025-05-13	Kedd	Kaszadella csomag	Közepes tipp	2-es kötés	_Kdl_Köz_2_1_9	Sassuolo - Frosinone	20:30 - Sassuolo vagy Döntetelen (Kétesélyes)	1.49	2.58
3cce8582-137a-4830-9e10-0e09ba32899b	2025-05-13	Kedd	Kaszadella csomag	Közepes tipp	2-es kötés	_Kdl_Köz_2_1_10	Haras El Hodood - National Bank of Egypt	19:00 - National Bank of Egypt (1X2)	1.68	2.70
6286d045-12d1-4740-b48b-519c7ef964ee	2025-05-13	Kedd	Kaszadella csomag	Közepes tipp	2-es kötés	_Kdl_Köz_2_1_10	Palermo - Carrarese	20:30 - Palermo (1X2)	1.61	2.70
3cdb8924-616a-4a4e-8cfe-e74b32279ec9	2025-05-13	Kedd	Kaszadella csomag	Nagy tipp	2-es kötés	_Kdl_Nag_2_1_11	Union SF - Mushuc Runa	(05.14) 02:30 - Mushuc Runa (Döntetlennél a tét visszajár)	4.35	5.83
120faece-4d3d-464c-91f2-194e762248e8	2025-05-13	Kedd	Kaszadella csomag	Nagy tipp	2-es kötés	_Kdl_Nag_2_1_11	El Zamalek - Pyramids FC	19:00 - Nem (Vendég csapat kapott gól nélkül játssza le a mérkőzést)	1.34	5.83
4b81b8b1-9fc6-47e8-90d3-d9caae6e9795	2025-05-13	Kedd	Start csomag	Közepes tipp	2-es kötés	_St_Köz_2_1_6	Valladolid - Ginora	19:00 - (Vendég csapat kapott gól nélkül játssza le a mérkőzést)	1.54	2.03
1de8d55d-d236-4458-9527-fa0b46ae7337	2025-05-13	Kedd	Start csomag	Közepes tipp	2-es kötés	_St_Köz_2_1_6	Lanus - Vasco de Gama RJ	(05.14) 02:30 - Lanus (Döntetlennél a tét visszajár)	1.32	2.03
480079c2-8b1d-4632-ad81-169481b7b0a4	2025-05-13	Kedd	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Dup_2_1_7	Valladolid - Ginora	19:00 - (Vendég csapat kapott gól nélkül játssza le a mérkőzést)	1.54	2.03
ccc474f5-8ef9-4915-b51e-d30451dc1e77	2025-05-13	Kedd	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Dup_2_1_7	Lanus - Vasco de Gama RJ	(05.14) 02:30 - Lanus (Döntetlennél a tét visszajár)	1.32	2.03
5146db3e-8c43-4976-af97-cf2841b5f0aa	2025-05-14	Szerda	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Dup_2_1_1	Alavés - Valencia	19:00 - 2-3 (Gólszám)	1.91	2.50
b34c8144-8d08-4b19-a440-2a1592c542d7	2025-05-14	Szerda	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Dup_2_1_1	Villareal - Leganes	19:00 - Kevesebb, mint 11,5 (SZögletszám 11,5)	1.31	2.50
0ea876a2-9823-4c09-90c1-b822f8750c54	2025-05-14	Szerda	Kaszadella csomag	Közepes tipp	2-es kötés	_Kdl_Köz_2_1_2	Galatasaray - Trabzonspor	19:45 - Galatasaray (Ki nyeri a Kupát?)	1.33	4.21
f2e05e7f-cbf4-400a-848f-4950958b830c	2025-05-14	Szerda	Kaszadella csomag	Közepes tipp	2-es kötés	_Kdl_Köz_2_1_2	Koper - Celje	20:00 - Igen (Mindkét csapat szerez gólt)	1.71	4.21
900f306e-83ba-4ac5-badd-66bcc0000524	2025-05-14	Szerda	Kaszadella csomag	Közepes tipp	2-es kötés	_Kdl_Köz_2_1_2	FTC - Paks	19:00 - 2-3 (Hazai csapat - Gólszámok)	1.85	4.21
97b3fdef-70f6-45ab-bf62-6cc1b70abb09	2025-05-14	Szerda	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Dup_2_1_3	FTC - Paks	19:00 - Igen (Mindkét csapat szerez gólt)	1.74	2.07
c2ce7a46-1d1f-434b-bcca-b6912380162e	2025-05-14	Szerda	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Dup_2_1_3	Oldham - Halifax	20:45 - Oldham vagy Döntetlen (Kétesélyes)	1.19	2.07
523b22f1-bd28-4234-aaa5-046bab37220e	2025-05-14	Szerda	Kaszadella csomag	Nagy tipp	2-es kötés	_Kdl_Nag_2_1_4	Real Madrid - Mallorca	21:30 - Mbappe, Kylian 1+ (Kezdőként gány gólt szerez?)	1.54	6.56
51e8a1db-b09f-45b5-8b90-1837c1f2deb8	2025-05-14	Szerda	Kaszadella csomag	Nagy tipp	2-es kötés	_Kdl_Nag_2_1_4	Villareal - Leganes	19:00 - Több, mint 7,5 (Szögletszám 7,5)/ 1-3 (Hazai csapat - Gólszámok)	1.83	6.56
f0fc1bc0-6e25-426c-80cf-e48be62b38fe	2025-05-14	Szerda	Kaszadella csomag	Nagy tipp	2-es kötés	_Kdl_Nag_2_1_4	Bologna - Milan	21:00 - Igen (Mindkét csapat szerez gólt)	1.75	6.56
ae5fa432-c1e4-4fe2-a62c-be25a0a161b7	2025-05-14	Szerda	Kaszadella csomag	Nagy tipp	2-es kötés	_Kdl_Nag_2_1_4	Galatasaray - Trabzonspor	19:45 - Galatasaray (Ki nyeri a Kupát?)	1.33	6.56
ec5b203f-1585-4f67-88d8-588057721bde	2025-05-14	Szerda	Kaszadella csomag	Közepes tipp	2-es kötés	_Kdl_Köz_2_1_5	Real Madrid - Mallorca	21:30 - Több, mint 7,5 (Szögletszám 7,5)/ Több, mint 0,5 (1.félidő - Büntetőlap - szám 0,5)/ 1-3 (Hazai csapat - Gólszámok)	2.60	2.60
5065197f-5873-4494-8540-5700215409e6	2025-05-15	Csütörtök	Kaszadella csomag	Duplázó	1-es kötés	_Kdl_Dup_Egyéni_1_1	Espanyol - Barcelona	21:30 - Barcelona -2,5 (Szöglet hendikep -2,5)/ Több, mint 0,5 (1.félidő - Gólszám 0,5)	2.01	2.01
c7d71c4f-d9b5-4340-98b1-6b6995e4ef66	2025-05-15	Csütörtök	Kaszadella csomag	Közepes tipp	3-as kötés	_Kdl_Köz_3_1_4	Göteborg - Öster	2-3 (Gólszám)	1.98	3.22
61aef43d-d9ae-42bf-86ed-c33ebcf7a5ca	2025-05-15	Csütörtök	Kaszadella csomag	Közepes tipp	3-as kötés	_Kdl_Köz_3_1_4	Ossasuna - Atl. Madrid	19:00 - Döntetlen vagy Atl. Madrid (Kétesélyes)	1.24	3.22
40e7486d-6f7f-4a32-81f9-9ed853edff03	2025-05-15	Csütörtök	Kaszadella csomag	Közepes tipp	3-as kötés	_Kdl_Köz_3_1_4	Rayo Vallecano - Betis	19:00 - Döntetlen vagy Betis (Kétesélyes)	1.31	3.22
91f7342b-4e71-4286-a2c9-879246ff6b3c	2025-05-15	Csütörtök	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Dup_2_1_2	Rayo Vallecano - Betis	19:00 - Betis (Döntetlennél a tét visszajár)	1.61	2.43
f9a3f499-3fbb-49db-a554-26735b2eacaa	2025-05-15	Csütörtök	Kaszadella csomag	Nagy tipp	2-es kötés	_Kdl_Nag_2_1_3	Getafe - Ath. Bilbao	21:30 - 3-4 (Vendégcsapat szögleteinek száma)	2.73	10.53
c965e24d-6d23-4bf7-8810-87847a21b5a1	2025-05-15	Csütörtök	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Dup_2_1_2	Krumograd - Slavia Szófia	14:15 - Kevesebb, mint 2,5 (Gólszám 2,5)	1.51	2.43
ece8ac64-4efe-4c5b-a837-6ece777fbf6a	2025-05-15	Csütörtök	Kaszadella csomag	Nagy tipp	2-es kötés	_Kdl_Nag_2_1_3	Espanyol - Barcelona	21:30 - Barcelona (Hendikep 1:0)	1.91	10.53
3601ade3-b9c3-43db-a479-203fdc7ad8a1	2025-05-15	Csütörtök	Kaszadella csomag	Nagy tipp	2-es kötés	_Kdl_Nag_2_1_3	Servette - Lugano	20:30 - 2-3 (Gólszám)	2.02	10.53
f5ba8606-1a05-4ab0-9163-015b7c001c4b	2025-05-15	Csütörtök	Kaszadella csomag	Közepes tipp	2-es kötés	_Kdl_Köz_2_1_1	Győr N - FTC N	19:00 - FTC (A mérkőzés győztese)	1.65	2.80
2d4ab2f9-9108-4e80-8dfb-0701374d4c72	2025-05-15	Csütörtök	Kaszadella csomag	Közepes tipp	2-es kötés	_Kdl_Köz_2_1_1	Osasuna - Atl. Madrid	19:00 - Döntetlen vagy Atl. Madrid	1.24	2.80
1ae26aa1-7012-4b71-a3fd-a449d7982177	2025-05-15	Csütörtök	Kaszadella csomag	Közepes tipp	2-es kötés	_Kdl_Köz_2_1_1	Espanyol - Barcelona	21:30 - Több, mint 2,5 (Gólszám 2,5)	1.37	2.80
d0b4176e-e914-4aac-b823-ca0f6cadf067	2025-05-17	Szombat	Kasza csomag	Duplázó	2-es kötés	_Kas_Dup_2_1_2	Freiburg - E. Frankfurt	15:30 - Igen (Mindkét csapat szerez gólt	1.44	1.99
1a106de2-52e6-4a12-8605-01e14d59576e	2025-05-17	Szombat	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Dup_2_1_1	Mainz - Leverkusen	15:30 - Igen (Mindkét csapat szerez gólt)	1.38	1.99
4727b370-597f-4077-8ae7-f14d0b4c4413	2025-05-17	Szombat	Kasza csomag	Duplázó	2-es kötés	_Kas_Dup_2_1_2	Mainz - Leverkusen	15:30 - Igen (Mindkét csapat szerez gólt)	1.38	1.99
de991cd3-c2ff-469b-bd53-6d4a4c31f99a	2025-05-17	Szombat	Start csomag	Duplázó	2-es kötés	_St_Dup_2_1_3	Freiburg - E. Frankfurt	15:30 - Igen (Mindkét csapat szerez gólt	1.44	1.99
27c3ed1d-1cd5-4efc-b191-7c8f8ecfc6c2	2025-05-17	Szombat	Start csomag	Duplázó	2-es kötés	_St_Dup_2_1_3	Mainz - Leverkusen	15:30 - Igen (Mindkét csapat szerez gólt)	1.38	1.99
54bea4d2-8ddb-4279-92b9-f899b22275a4	2025-05-17	Szombat	Kaszadella csomag	Duplázó	3-as kötés	_Kdl_Dup_3_1_4	PSV - Feyenoord	14:00 - PSV (1X2)	1.27	1.97
a119246e-3fad-4d3a-865f-d6c5e4fe5616	2025-05-17	Szombat	Kaszadella csomag	Duplázó	3-as kötés	_Kdl_Dup_3_1_4	Shanghai Port - Shandong Taishan	14:00 - Több, mint 2,5 (Gólszám 2,5)	1.29	1.97
387af006-4d94-4fc7-bf89-1d6bb43d8fcb	2025-05-17	Szombat	Kaszadella csomag	Duplázó	3-as kötés	_Kdl_Dup_3_1_4	Crystal Palace - Manchester City	17:30 - Több, mint 1,5 (Gólszám 1,5)	1.20	1.97
f8026181-3c5a-41e9-85a4-9c246add06fc	2025-05-17	Szombat	Kasza csomag	Duplázó	3-as kötés	20250517_Kas_Dup_3_6	PSV - Feyenoord	14:00 - PSV (1X2)	1.27	1.97
d8b8526f-e534-402a-872c-04c1a0fb31d7	2025-05-17	Szombat	Kasza csomag	Duplázó	3-as kötés	20250517_Kas_Dup_3_6	Shanghai Port - Shandong Taishan	14:00 - Több, mint 2,5 (Gólszám 2,5)	1.29	1.97
860382af-5099-4714-a9ac-2b8d743223a0	2025-05-17	Szombat	Kasza csomag	Duplázó	3-as kötés	20250517_Kas_Dup_3_6	Crystal Palace - Manchester City	17:30 - Több, mint 1,5 (Gólszám 1,5)	1.20	1.97
26c23e54-7456-431d-a232-e04af9fd72dd	2025-05-17	Szombat	Kaszadella csomag	Közepes tipp	3-as kötés	_Kdl_Köz_3_1_6	Huesca - Elche	18:30 - Nem (Vendégcsapat kapott gól nélkül játsza le a mérkőzést)	1.47	2.50
319c134d-cc51-43c6-8699-691afd212694	2025-05-17	Szombat	Kaszadella csomag	Közepes tipp	3-as kötés	_Kdl_Köz_3_1_6	Winterhur - Yverdon	18:00 - Winterhur vagy Döntetlen	1.38	2.50
e207ccfd-2eb5-4e04-b8c6-675bd53e6e5c	2025-05-17	Szombat	Kaszadella csomag	Közepes tipp	3-as kötés	_Kdl_Köz_3_1_6	ZTE - Győr	13:45 - Nem (Vendégcsapat kapott gól nélkül játsza le a mérkőzést)	1.23	2.50
901dbdf7-eb19-4552-a981-3f8d37d96f0c	2025-05-17	Szombat	Start csomag	Közepes tipp	3-as kötés	_St_Köz_3_1_7	Huesca - Elche	(Vendégcsapat kapott gól nélkül játsza le a mérkőzést)	1.47	2.50
142a315d-2acb-452d-a171-65784b162494	2025-05-17	Szombat	Start csomag	Közepes tipp	3-as kötés	_St_Köz_3_1_7	Winterhur - Yverdon	18:00 - Winterhur vagy Döntetlen	1.38	2.50
3b845a00-c18f-4be9-bd55-7d7b7fc895e4	2025-05-17	Szombat	Start csomag	Közepes tipp	3-as kötés	_St_Köz_3_1_7	ZTE - Győr	13:45 - Nem (Vendégcsapat kapott gól nélkül játsza le a mérkőzést)	1.23	2.50
2ee79e91-6c78-442b-beca-8677f993a7fc	2025-05-17	Szombat	Kaszadella csomag	Nagy tipp	4-es kötés	_Kdl_Nag_4_1_8	Braga - Benfica	19:00 - Benfica (1X2)	1.48	6.20
d4e16910-7528-4e9d-9420-37ad07b19b05	2025-05-17	Szombat	Kaszadella csomag	Nagy tipp	4-es kötés	_Kdl_Nag_4_1_8	Altach - Ausztria Klagenfurt	17:00 - Altach (1X2)	1.51	6.20
f29c1e55-c4e7-4b43-bcb3-075eab9a2a54	2025-05-17	Szombat	Kaszadella csomag	Nagy tipp	4-es kötés	_Kdl_Nag_4_1_8	Marseille - Rennes	21:00 - Marseille (1X2)	1.67	6.20
6ea74f5a-b142-483c-8a17-23d9bfc30b24	2025-05-17	Szombat	Kaszadella csomag	Nagy tipp	4-es kötés	_Kdl_Nag_4_1_8	Lens - Monaco	21:00 - Monaco (1X2)	1.66	6.20
8ce71abd-9a0e-4f5d-b0de-4c975e1563e2	2025-05-17	Szombat	Kasza csomag	Nagy tipp	4-es kötés	_Kas_Nag_4_1_9	Braga - Benfica	19:00 - Benfica (1X2)	1.48	6.20
fc181aac-da1c-4083-8d68-3ec2bbeca2b4	2025-05-17	Szombat	Kasza csomag	Nagy tipp	4-es kötés	_Kas_Nag_4_1_9	Altach - Ausztria Klagenfurt	17:00 - Altach (1X2)	1.51	6.20
ddcfe1ad-4427-48a8-8633-f8ab6128cf20	2025-05-17	Szombat	Kasza csomag	Nagy tipp	4-es kötés	_Kas_Nag_4_1_9	Marseille - Rennes	21:00 - Marseille (1X2)	1.67	6.20
6417929a-2e27-44a0-955c-4beedc55ada3	2025-05-17	Szombat	Kasza csomag	Nagy tipp	4-es kötés	_Kas_Nag_4_1_9	Lens - Monaco	21:00 - Monaco (1X2)	1.66	6.20
55da2158-0ebb-4927-bcd5-c174e467753b	2025-05-17	Szombat	Kaszadella csomag	Extra hétvégi	10-es kötés	_Kdl_Ext_Egyéni_1_10	Crystal Palace - Manchester City	17:30 - Igen (Mindkét csapat szerez gólt)	1.63	82.86
1a59ea3e-d6bd-494c-ae55-c2f7ceecd824	2025-05-17	Szombat	Kaszadella csomag	Extra hétvégi	10-es kötés	_Kdl_Ext_Egyéni_1_10	Genoa - Atalanta	20:45 - Több, mint 2,5 (Gólszám 2,5)	1.68	82.86
f9fcce0c-7408-4ef1-97af-3f702f09e8b2	2025-05-17	Szombat	Kaszadella csomag	Extra hétvégi	10-es kötés	_Kdl_Ext_Egyéni_1_10	Kawasaki Frontale - Cerezo Osaka	(05.18) 8:00 - Több, mint 2,5 (Gólszám 2,5)	1.53	82.86
a35e3500-1d7c-4629-9011-0d7dfea40e96	2025-05-17	Szombat	Kaszadella csomag	Extra hétvégi	10-es kötés	_Kdl_Ext_Egyéni_1_10	Arsenal - Newcastle	(05.18) 17:30 - Igen (Mindkét csapat szerez gólt)	1.59	82.86
a2146e85-da44-43ad-82fc-ae18e80c5e8b	2025-05-17	Szombat	Kaszadella csomag	Extra hétvégi	10-es kötés	_Kdl_Ext_Egyéni_1_10	Aalborg - Silkeborg	(05.18) - 14:00 Silkeborg (Döntetlennél a tét visszajár)	1.65	82.86
9a10a73d-a559-44c7-8253-76aaa9b7248f	2025-05-17	Szombat	Kaszadella csomag	Extra hétvégi	10-es kötés	_Kdl_Ext_Egyéni_1_10	Hacken - Varnamo	(05.18) 14:00 - Több, mint 2,5 (Gólszám 2,5)	1.55	82.86
e126318e-3eed-4114-b88a-a49074e3f975	2025-05-17	Szombat	Kaszadella csomag	Extra hétvégi	10-es kötés	_Kdl_Ext_Egyéni_1_10	Freiburg - E. Frankfurt	15:30 - Igen (Mindkét csapat szerez gólt)	1.44	82.86
1e0938b8-526d-4dcf-8fdb-003719c010b1	2025-05-17	Szombat	Kaszadella csomag	Extra hétvégi	10-es kötés	_Kdl_Ext_Egyéni_1_10	Winterhur - Yverdon	18:00 - Winterhur (Döntetlennél a tét visszajár)	1.71	82.86
b3b88435-098a-4869-8d19-898deeccc233	2025-05-17	Szombat	Kaszadella csomag	Extra hétvégi	10-es kötés	_Kdl_Ext_Egyéni_1_10	Atalanta Utd. - Philadelphia	(05.18) 01:30 - Nem (Hazai csapat kapott gól nélkül játsza le a mérkőzést)	1.25	82.86
31abcb74-1a24-406d-86a4-b52cc1a76474	2025-05-17	Szombat	Kaszadella csomag	Extra hétvégi	10-es kötés	_Kdl_Ext_Egyéni_1_10	Anderlecht - FC Bruges	(05.18) 13:30 - FC Bruges (1X2)	1.58	82.86
0d477a2e-e92f-4a0b-82dc-d34f0584b176	2025-05-17	Szombat	Kaszadella csomag	Közepes tipp	1-es kötés	_Kdl_Köz_Egyéni_1_11	NEM MERED TIPP : Yokohama FM - Kyoto	07:00 - Vendég és igen (1X2 + Mindkét csapat szerez gólt)	5.00	5.00
8e5026d0-c00f-470e-a7ff-e3cf562ae37f	2025-05-17	Szombat	Kaszadella csomag	Közepes tipp	3-as kötés	_Kdl_Köz_3_1_12	Melbourne Victory - Auckland FC	11:35 - Több, mint 2,5 (Gólszám 2,5)	1.71	4.17
8a252062-68ac-4719-932a-d07061c89f5b	2025-05-17	Szombat	Kaszadella csomag	Közepes tipp	3-as kötés	_Kdl_Köz_3_1_12	Altach - Austira Klagenfurt	17:00 - Több, mint 2,5 (Gólszám 2,5)	1.67	4.17
6fc5cb4d-f75d-4668-94ea-1cfc34b42eca	2025-05-17	Szombat	Kaszadella csomag	Közepes tipp	3-as kötés	_Kdl_Köz_3_1_12	Sporting CP - Guimaraes	19:00 - Több, mint 2,5 (Gólszám 2,5)	1.46	4.17
2b2746df-118a-4806-83b8-fa20a21c8fef	2025-05-17	Szombat	Kasza csomag	Közepes tipp	3-as kötés	_Kas_Köz_3_1_13	Melbourne Victory - Auckland FC	11:35 - Több, mint 2,5 (Gólszám 2,5)	1.71	4.17
1f811b68-ab4a-45e2-b343-ef2fc973501c	2025-05-17	Szombat	Kasza csomag	Közepes tipp	3-as kötés	_Kas_Köz_3_1_13	Altach - Austira Klagenfurt	17:00 - Több, mint 2,5 (Gólszám 2,5)	1.67	4.17
3ee649b8-196f-44a7-9d73-a1b04598c70f	2025-05-17	Szombat	Kasza csomag	Közepes tipp	3-as kötés	_Kas_Köz_3_1_13	Sporting CP - Guimaraes	19:00 - Több, mint 2,5 (Gólszám 2,5)	1.46	4.17
e0424318-37a7-43f6-bcae-4279fbc24c88	2025-05-17	Szombat	Start csomag	Közepes tipp	3-as kötés	_St_Köz_3_1_14	Melbourne Victory - Auckland FC	11:35 - Több, mint 2,5 (Gólszám 2,5)	1.71	4.17
212202a6-03f1-4a53-b758-ee32d3574977	2025-05-17	Szombat	Start csomag	Közepes tipp	3-as kötés	_St_Köz_3_1_14	Altach - Austira Klagenfurt	17:00 - Több, mint 2,5 (Gólszám 2,5)	1.67	4.17
78071f5f-1ea3-4d01-a6aa-de3bd618c54c	2025-05-17	Szombat	Start csomag	Közepes tipp	3-as kötés	_St_Köz_3_1_14	Sporting CP - Guimaraes	19:00 - Több, mint 2,5 (Gólszám 2,5)	1.46	4.17
f22671bf-4717-448f-b26a-0bfe41db8244	2025-05-17	Szombat	Start csomag	Duplázó	2-es kötés	_St_Dup_2_1_15	Genoa - Atalanta	20:45 - Több, mint 2,5 (Gólszám 2,5)	1.68	2.44
60d43060-2454-48a2-a56b-ea79ecfeaf82	2025-05-17	Szombat	Start csomag	Duplázó	2-es kötés	_St_Dup_2_1_15	Marseille - Rennes	21:00 - Több, mint 2,5 (Gólszám 2,5)	1.45	2.44
e479b290-1831-4468-b5de-912cc70f84c2	2025-05-17	Szombat	Kasza csomag	Duplázó	2-es kötés	_Kas_Dup_2_1_16	Genoa - Atalanta	20:45 - Több, mint 2,5 (Gólszám 2,5)	1.68	2.44
0650646a-0e5c-4692-93a0-6c527e080eff	2025-05-17	Szombat	Kasza csomag	Duplázó	2-es kötés	_Kas_Dup_2_1_16	Marseille - Rennes	21:00 - Több, mint 2,5 (Gólszám 2,5)	1.45	2.44
940bd8e8-39c4-4fa1-8f7a-9144abb48885	2025-05-17	Szombat	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Dup_2_1_17	Genoa - Atalanta	20:45 - Több, mint 2,5 (Gólszám 2,5)	1.68	2.44
e3160a31-7f3a-42a7-a386-2e9bf6731370	2025-05-17	Szombat	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Dup_2_1_17	Marseille - Rennes	21:00 - Több, mint 2,5 (Gólszám 2,5)	1.45	2.44
ebbf8f22-a5b7-4533-8d50-d974f6fc0f10	2025-05-17	Szombat	Kaszadella csomag	Nagy tipp	5-ös kötés	_Kdl_Nag_Egyéni_1_2	Freiburg - E.Frankfurt	15:30 - Igen (Mindkét csapat szerez gólt)	1.44	6.18
7c4ec943-5966-4528-b650-753b8050efc4	2025-05-17	Szombat	Kaszadella csomag	Nagy tipp	5-ös kötés	_Kdl_Nag_Egyéni_1_2	Mönchengladbach - Wolfsburg	15:30 - Több, mint 3,5 (Gólszám 3,5)	1.63	6.18
dd545ae3-2107-41c3-ad87-96e23a731f02	2025-05-17	Szombat	Kaszadella csomag	Nagy tipp	5-ös kötés	_Kdl_Nag_Egyéni_1_2	RB Leipzig - VfB Stuttgart	15:30 - Igen és több, mint 2,5 (Mindkét csapat szerez gólt + Gólszám 2,5)	1.46	6.18
7f9da77b-9962-4311-bccb-ae87b7609971	2025-05-17	Szombat	Kaszadella csomag	Nagy tipp	5-ös kötés	_Kdl_Nag_Egyéni_1_2	Lens - Monaco	21:00 - Több, mint 2,5 (Gólszám 2,5)	1.42	6.18
2c88b748-a803-4da8-b160-ac10893df8bc	2025-05-17	Szombat	Kaszadella csomag	Nagy tipp	5-ös kötés	_Kdl_Nag_Egyéni_1_2	Lille - Reins	21:00 - Lille (1X2)	1.27	6.18
eef5502c-976d-4c40-87f1-56f1f87a1914	2025-05-17	Szombat	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Dup_2_1_1	Freiburg - E. Frankfurt	15:30 -  Igen (Mindkét csapat szerez gólt)	1.44	1.99
e920229d-c561-466a-b134-8764b9e3f9e6	2025-05-17	Szombat	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Dup_2_1_1B	Hibernian - Rangers	13:30 - Több, mint 2,5 (Gólszám 2,5)	1.42	2.56
9a57138e-3a9b-4140-bfc2-0eed634b1119	2025-05-17	Szombat	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Dup_2_1_1B	Crystal Palace - Manchester City	17:30 - Manchester City (1X2)	1.80	2.56
45664b4d-ab82-4c51-86ce-d4c1992267cf	2025-05-17	Szombat	Kaszadella csomag	Nagy tipp	6-os kötés	_Kdl_Nag_Egyéni_1_1	Hoffenheim - Bayern München	15:30 - Bayern München (1X2)	1.42	5.43
30bcb50b-f828-4429-8b08-20aef42842af	2025-05-17	Szombat	Kaszadella csomag	Nagy tipp	6-os kötés	_Kdl_Nag_Egyéni_1_1	Lyon - Angers	21:00 - Több, mint 6,5 (Szögletszám 6,5)	1.20	5.43
cc4e068a-fab8-461a-8ec4-a81448eaee3c	2025-05-17	Szombat	Kaszadella csomag	Nagy tipp	6-os kötés	_Kdl_Nag_Egyéni_1_1	Strasbourg - Le Havre	21:00 - Strasbourg vagy Döntetlen (Kétesélyes)	1.14	5.43
ad8dae42-ca0f-497c-bdbe-8d500d2bf5a2	2025-05-17	Szombat	Kaszadella csomag	Nagy tipp	6-os kötés	_Kdl_Nag_Egyéni_1_1	Antwerpen - RU Saint-Gilloise	20:45 - Antwerpen vagy RU Saint-Gilloise (Kétesélyes)	1.18	5.43
2ee67a65-6b3f-433c-b705-2aa6b38cf844	2025-05-17	Szombat	Kaszadella csomag	Nagy tipp	6-os kötés	_Kdl_Nag_Egyéni_1_1	Horsens - Fredericia	14:00 - Igen (Mindkét csapat szerez gólt)	1.49	5.43
ce40765f-ae99-4a0e-9587-1c68345d7ad5	2025-05-17	Szombat	Kaszadella csomag	Nagy tipp	6-os kötés	_Kdl_Nag_Egyéni_1_1	Kolding IF - OB Odense	14:00 - Igen (mindkét csapat szerez gólt)	1.59	5.43
514cfad4-1cf0-4850-b5d0-777384d3bbf9	2025-05-17	Szombat	Kaszadella csomag	Közepes tipp	2-es kötés	_Kdl_Köz_2_1_1	Hoffenheim - Bayern München	15:30 - Bayern München (1X2)/ 1-3 (Vendégcsapat - Gólszám)	2.28	2.67
545dbb4f-19cd-4f24-82c9-2071892df33a	2025-05-17	Szombat	Kaszadella csomag	Közepes tipp	2-es kötés	_Kdl_Köz_2_1_1	Genoa - Atalanta	20:45 - Döntetlen vagy Atalanta (Kétesélyes)	1.17	2.67
e597478a-a9be-44a9-978d-b668d04bffc4	2025-05-17	Szombat	Kaszadella csomag	Duplázó	1-es kötés	20250517_Kdl_Dup_Egyéni_3	Crystal Palace - Manchester City	17:30 - Manchester City (1X2)/ Több, mint 7,5 (Szögletszám 7,5)	2.20	2.20
cf222ed5-3b30-4505-a85e-90fd5f7beab0	2025-05-17	Szombat	Start csomag	Duplázó	1-es kötés	_St_Dup_Egyéni_1_3	Crystal Palace - Manchester City	17:30 - Manchester City (1X2)/ Több, mint 7,5 (Szögletszám 7,5)	2.20	2.20
2bf52a64-2a5c-4d3b-8b01-2036ff196365	2025-05-18	Vasárnap	Kasza csomag	Duplázó	1-es kötés	_Kas_Dup_Egyéni_1_1	AIK Stockholm - Hammarby	14:00 - (Mindkét csapat szerez gólt)	1.95	1.95
1343370a-e176-4224-8433-be66f7c4ed8d	2025-05-18	Vasárnap	Start csomag	Duplázó	1-es kötés	_St_Dup_Egyéni_1_2	AIK Stockholm - Hammarby	14:00 - (Mindkét csapat szerez gólt)	1.95	1.95
b1f49ca7-db63-4d1c-baca-eeb131ddb2fa	2025-05-18	Vasárnap	Kaszadella csomag	Duplázó	1-es kötés	_Kdl_Dup_Egyéni_1_3	AIK Stockholm - Hammarby	14:00 - (Mindkét csapat szerez gólt)	1.95	1.95
c06fcda7-b57f-4339-acc6-984e1d2ed9f5	2025-05-18	Vasárnap	Kaszadella csomag	Duplázó	3-as kötés	_Kdl_Dup_3_1_4	Sparta Rotterdam - PSV	14:30 - PSV (1X2)	1.21	2.04
2755541a-0fa5-449d-88b9-18a906439ce5	2025-05-18	Vasárnap	Kaszadella csomag	Duplázó	3-as kötés	_Kdl_Dup_3_1_4	FTC - Fehérvár	19:30 - FTC (1X2)	1.25	2.04
3471e139-9116-4de2-ad9f-bc7cf57c3fe9	2025-05-18	Vasárnap	Kaszadella csomag	Duplázó	3-as kötés	_Kdl_Dup_3_1_4	Juventus - Udinese	20:45 - Kevesebb, mint 3,5 (Gólszám 3,5)	1.35	2.04
62f3d203-5953-4ace-b78d-0b9db9c351c2	2025-05-18	Vasárnap	Kaszadella csomag	Közepes tipp	1-es kötés	_Kdl_Köz_Egyéni_1_5	Arsenal - Newcastle	17:30 - Newcastle (Döntetlennél a tét visszajár)	2.55	2.55
f29f2eed-b1cf-40ca-b690-aef322b70dfb	2025-05-18	Vasárnap	Kaszadella csomag	Nagy tipp	3-as kötés	_Kdl_Nag_3_1_6	Politehnica Iasi - Petrolul Ploiesti	15:00 - Politehnica Iasi (Döntetelennél a tét visszajár)	2.27	6.16
d28e62ca-a586-4800-bd0f-43f95f8c1e2e	2025-05-18	Vasárnap	Kaszadella csomag	Nagy tipp	3-as kötés	_Kdl_Nag_3_1_6	Aalborg - Silkeborg	14:00 - Silkeborg	2.04	6.16
0f9992a4-24f5-4f8f-8ecd-8c68d1ac3db8	2025-05-18	Vasárnap	Kaszadella csomag	Nagy tipp	3-as kötés	_Kdl_Nag_3_1_6	Young Boys - Basel	14:15 - Igen (Mindkét csapat szerez gólt)	1.33	6.16
35b0bd2a-bb1e-4735-a452-db1dd731f57b	2025-05-18	Vasárnap	Kaszadella csomag	Közepes tipp	2-es kötés	20250518_Kdl_Köz_2_8	West Ham - Nottingham	15:15 - Több, mint 2,5 (Gólszám 2,5)	1.76	3.96
ff8d0971-693b-40a6-b911-ee5ae8f66ff3	2025-05-18	Vasárnap	Kaszadella csomag	Közepes tipp	2-es kötés	20250518_Kdl_Köz_2_8	Leicester - Ipswich	16:00 - Igen (Mindkét csapat szerz gólt)	1.51	3.96
90db4bb2-dab0-4d6a-990b-c4b5d8e53b72	2025-05-18	Vasárnap	Kaszadella csomag	Közepes tipp	2-es kötés	20250518_Kdl_Köz_2_8	Brentford - Fulham	16:00 - Igen (Mindkét csapat szerez gólt)	1.49	3.96
00c1b392-485a-4882-9781-18bdb878be0f	2025-05-18	Vasárnap	Kaszadella csomag	Nagy tipp	5-ös kötés	20250518_Kdl_Nag_Egyéni_3	Sevilla - Real Madrid	19:00 - Mbappe, Kylian 1+ (Kezdőként hány gólt szerez?)	1.72	10.24
363150fb-192f-4453-b7cd-b97ebb8c248a	2025-05-18	Vasárnap	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Dup_2_1_3	Anderlecht - FC Bruges	13:30 - Több, mint 2,5 (Gólszám 2,5)	1.57	2.31
1573781b-5490-438b-859e-23add6c1c872	2025-05-18	Vasárnap	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Dup_2_1_3	Aalborg - Silkeborg	14:00 - Több, mint 2,5 (Gólszám 2,5)	1.47	2.31
43f50038-c43f-41f5-9f37-c24f6f268d83	2025-05-18	Vasárnap	Kaszadella csomag	Duplázó	3-as kötés	20250518_Kdl_Dup_3_5	Ajax - Twente	14:30 - Több, mint 2,5 (Gólszám 2,5)	1.33	2.13
8edc8126-3009-4560-842a-ced566935f0e	2025-05-18	Vasárnap	Kaszadella csomag	Duplázó	3-as kötés	20250518_Kdl_Dup_3_5	Heerenveen - Feyenoord	14:30 - Több, mint 2,5 (Gólszám 2,5)	1.39	2.13
134634a6-b4ed-4ecd-bbd9-46dc61570dff	2025-05-18	Vasárnap	Kaszadella csomag	Duplázó	3-as kötés	20250518_Kdl_Dup_3_5	Sparta Rotterdam - PSV	14:30 - Több, mint 2,5 (Gólszám 2,5)	1.15	2.13
0ee5d197-278c-4546-b397-fe9b33790ba3	2025-05-18	Vasárnap	Kaszadella csomag	Duplázó	3-as kötés	_Kdl_Dup_3_1_5	Monza - Empoli	20:45 - Döntetlen vagy Empoli (Kétesélyes)	1.15	2.06
f2b34139-058f-4cab-98cd-f3bd235e5d20	2025-05-18	Vasárnap	Kaszadella csomag	Duplázó	3-as kötés	_Kdl_Dup_3_1_5	Barcelona - Villareal	19:00 - Igen (Mindkét csapat szerez gólt)	1.32	2.06
b368f517-22a3-432b-903f-351ae879d1c6	2025-05-18	Vasárnap	Kaszadella csomag	Duplázó	3-as kötés	_Kdl_Dup_3_1_5	Fürth - Hamburg	15:30 - Döntetlen vagy Hamburg (Kétesélyes)	1.36	2.06
798f86c4-7d21-4ea2-8454-c007c68badfa	2025-05-18	Vasárnap	Kaszadella csomag	Duplázó	3-as kötés	20250518_Kdl_Dup_3_7	Sevilla - Real Madrid	19:00 - Döntetlen vagy Real Madrid	1.22	2.13
bb471ac6-a598-4b3a-97da-04b9a7cb1963	2025-05-18	Vasárnap	Kaszadella csomag	Duplázó	3-as kötés	20250518_Kdl_Dup_3_7	Schalke - Elversberg	15:30 - Döntetlen vagy Elversberg	1.17	2.13
c05efd13-adcc-439d-9aad-85f8c74467c7	2025-05-18	Vasárnap	Kaszadella csomag	Duplázó	3-as kötés	20250518_Kdl_Dup_3_7	Everton - Southampton	13:00 - Everton -1,5 (Szöglet hendikep -1,5)	1.49	2.13
d86bf8cd-8d18-4337-ad4e-622e013c2ada	2025-05-18	Vasárnap	Kaszadella csomag	Közepes tipp	2-es kötés	_Kdl_Köz_2_1_7	FTC - Fehérvár	19:30 - FTC (1X2)	1.25	2.67
fb2d4706-2302-4a3b-808c-6af722d0ac99	2025-05-18	Vasárnap	Kaszadella csomag	Közepes tipp	2-es kötés	_Kdl_Köz_2_1_7	Internazionale - Lazio	20:45 - Internazionale vagy Döntelen (Kétesélyes)/ Internazionale -0,5 (Szöglet hendikep -0,5)	1.94	2.67
540c3183-217d-43c5-966b-724718a6475d	2025-05-18	Vasárnap	Kaszadella csomag	Közepes tipp	2-es kötés	_Kdl_Köz_2_1_7	Parma - Napoli	20:45 - Döntetlen vagy Napoli	1.10	2.67
43e91466-1f5b-45a1-8683-d2516f2de886	2025-05-18	Vasárnap	Kaszadella csomag	Nagy tipp	4-es kötés	_Kdl_Nag_4_1_8	Arsenal - Newcastle	17:30 - Igen (Mindkét csapat szerez gólt)	1.60	5.32
827c8ec4-eef4-4413-ac39-00ff7451664a	2025-05-18	Vasárnap	Kaszadella csomag	Nagy tipp	4-es kötés	_Kdl_Nag_4_1_8	Viborg - Vejle	14:00 - Viborg vagy Döntetlen (Kétesélyes)	1.19	5.32
419dd547-ccaa-4821-be40-5a5a502fcf8b	2025-05-18	Vasárnap	Kaszadella csomag	Nagy tipp	4-es kötés	_Kdl_Nag_4_1_8	Valencia - Real Madrid	19:00 - Real Madrid (1.félidő - 1X2)	1.44	5.32
db89c212-b69e-4f04-b49f-565bc29d5645	2025-05-18	Vasárnap	Kaszadella csomag	Nagy tipp	4-es kötés	_Kdl_Nag_4_1_8	Internazionale - Lazio	20:45 - Internazionale vagy Döntetelen (Kétesélyes)/ Internazionale -0,5 (Szöglet hendikep -0,5)	1.94	5.32
7f55b418-1dca-411b-b1ef-a83872608ac5	2025-05-18	Vasárnap	Kaszadella csomag	Nagy tipp	5-ös kötés	20250518_Kdl_Nag_Egyéni_3	Atl. Madrid - Betis	19:00 - Igen (Mindkét csapat szerez gólt)	1.61	10.24
71e3a2af-441c-4fbe-a629-e82d1992638b	2025-05-18	Vasárnap	Kaszadella csomag	Nagy tipp	5-ös kötés	20250518_Kdl_Nag_Egyéni_3	Internazionale - Lazio	20:45 - Internazionale (1X2)	1.55	10.24
e234a920-a1e9-418e-a090-f7d6f4fb1348	2025-05-18	Vasárnap	Kaszadella csomag	Nagy tipp	5-ös kötés	20250518_Kdl_Nag_Egyéni_3	Roma - Milan	20:45 - Igen és több, mint 2,5 (Mindkét csapat szerez gólt + Gólszám 2,5)	1.85	10.24
8c69d832-42af-4d56-b2d3-808daf2029f7	2025-05-18	Vasárnap	Kaszadella csomag	Nagy tipp	5-ös kötés	20250518_Kdl_Nag_Egyéni_3	Fiorentina - Bologna	20:45 - Több, mint 1,5 (Gólszám 1,5)	1.29	10.24
77d8a6fc-c382-47ca-81d9-21fa81ed1b3d	2025-05-19	Hétfő	Kaszadella csomag	Közepes tipp	3-as kötés	_Kdl_Köz_3_1_1	Brighton - Liverpool	21:00 - Liverpool (1X2)	2.40	5.86
06417f0c-6ae3-4a73-9677-da9a32729f3c	2025-05-19	Hétfő	Kaszadella csomag	Közepes tipp	3-as kötés	_Kdl_Köz_3_1_1	Stjarnan - Vikingur Reykavjik	21:15 - Több, mint 2,5 (Gólszám 2,5)	1.38	5.86
5e73b59c-d03a-4414-9e59-fbb4be6b66c7	2025-05-19	Hétfő	Kaszadella csomag	Közepes tipp	3-as kötés	_Kdl_Köz_3_1_1	Degerfors - Göteborg	19:00 - Több, mint 2,5 (Gólszám 2,5)	1.77	5.86
a54d7b9e-5be0-40b5-86ba-5a71bee96943	2025-05-19	Hétfő	Kaszadella csomag	Duplázó	3-as kötés	_Kdl_Dup_3_1_2	Bröndby - Midtjylland	19:00 - Több, mint 2,5 (Gólszám 2,5)	1.46	2.56
5fae4bbe-c85c-4a25-a560-9dfbd230112a	2025-05-19	Hétfő	Kaszadella csomag	Duplázó	3-as kötés	_Kdl_Dup_3_1_2	Beitar Jerusalem - Hapoel Beer Sheva	19:30 - Több, mint 2,5 (Gólsszám 2,5)	1.39	2.56
5dac30ff-7a35-4f24-8524-2ec38407ea11	2025-05-19	Hétfő	Kaszadella csomag	Duplázó	3-as kötés	_Kdl_Dup_3_1_2	Kazincbarcika - Mezőkövesd	20:00 - Több, mint 1,5 (Gólszám 1,5)	1.26	2.56
3cae5031-4a62-4f53-a77a-77bab391c508	2025-05-19	Hétfő	Kaszadella csomag	Közepes tipp	2-es kötés	_Kdl_Köz_2_1_3	Maccabi Haifa - Maccabi TA	19:30 - Döntetlen vagy Maccabi TA (Kétesélyes)	1.14	2.61
8a44205a-ee02-4eeb-90ae-ca9458726f80	2025-05-19	Hétfő	Kaszadella csomag	Közepes tipp	2-es kötés	_Kdl_Köz_2_1_3	Atl. Fenix - Argentino de Merlo	20:30 - Döntetlen vagy Argentino de Merlo (Kétesélyes)	1.14	2.61
e0fba56a-8322-471d-974d-71aaf393ce5d	2025-05-19	Hétfő	Kaszadella csomag	Közepes tipp	2-es kötés	_Kdl_Köz_2_1_3	Brighton - Liverpool	21:00 - Több, mint 5,5 (Vendégcsapat szögletszám 5,5)	2.01	2.61
19f9f4a5-e08f-4f02-a116-876348ac610b	2025-05-19	Hétfő	Kaszadella csomag	Közepes tipp	2-es kötés	_Kdl_Köz_2_1_4	TENISZ	-	1.00	3.36
98bf0687-356c-415e-ba0a-bfefa52a319f	2025-05-19	Hétfő	Kaszadella csomag	Közepes tipp	2-es kötés	_Kdl_Köz_2_1_4	Ann Li - M. Timofeeva	12:00 - Ann Li (A mérkőzés győztese)	1.28	3.36
1cd57308-8536-4413-a042-bf0f1aa9b09f	2025-05-19	Hétfő	Kaszadella csomag	Közepes tipp	2-es kötés	_Kdl_Köz_2_1_4	Colton Smith - S. Napoltano	13:00 - Colton Smith (A mérkőzés győztese)	1.45	3.36
5f22b37d-674b-481f-8694-b9512c3cea49	2025-05-19	Hétfő	Kaszadella csomag	Közepes tipp	2-es kötés	_Kdl_Köz_2_1_4	M. Arnaldi - H. Gaston	14:30 - M. Arnaldi (A mérkőzés győztese)	1.35	3.36
522bc54f-d7b5-461f-8978-2fc4b6815b15	2025-05-19	Hétfő	Kaszadella csomag	Közepes tipp	2-es kötés	_Kdl_Köz_2_1_4	C. Norrie - D.S. Sticker	18:00 - C.Norrie (A mérkőzés győzteese)	1.34	3.36
65748d31-904f-45a7-ab38-02c8dd926c3b	2025-05-19	Hétfő	Kaszadella csomag	Nagy tipp	7-es kötés	_Kdl_Nag_Egyéni_1_1	SZELES BOLONDOZÁS	-	1.00	32.95
50b0191b-e07a-48e4-a065-894c130c7a7e	2025-05-19	Hétfő	Kaszadella csomag	Nagy tipp	7-es kötés	_Kdl_Nag_Egyéni_1_1	Brighton - Liverpool	21:00 - igen (Mindkét csapat szerez gólt)/ Több, mint 2,5 (Gólszám 2,5)/ Több, mint 5,5 (Venégcsapat szögletszám 5,5)/ Több, mint 2,5 (Büntetőlap-szám 2,5)/ Több, mint 0,5 (1.félidő - Gólszám 0,5)	4.97	32.95
4065a634-b5a1-41b5-8c92-70c4ea896707	2025-05-19	Hétfő	Kaszadella csomag	Nagy tipp	7-es kötés	_Kdl_Nag_Egyéni_1_1	Stjarnan - Vikingur Reykjavik	21:15 - Igen (Mindkét csapat szerez gólt)	1.43	32.95
4f65fa90-8a9d-4441-a872-a9c04171102f	2025-05-19	Hétfő	Kaszadella csomag	Nagy tipp	7-es kötés	_Kdl_Nag_Egyéni_1_1	Magyarország - Norvégia	20:20 - Több, mint 4,5 (Gólszám 4,5)	1.62	32.95
9ef4782d-fbce-4210-afa3-58766b36ba3f	2025-05-19	Hétfő	Kaszadella csomag	Nagy tipp	7-es kötés	_Kdl_Nag_Egyéni_1_1	Kanada - Finnország	20:20 - Több, mint 4,5 (Gólszám 4,5)	1.37	32.95
1e245b28-e55f-450f-bea4-40515db5f08f	2025-05-19	Hétfő	Kaszadella csomag	Nagy tipp	7-es kötés	_Kdl_Nag_Egyéni_1_1	Franciaország - Szlovénia	16:20 - Franciaország vagy Döntetlen	1.22	32.95
22b40eec-4a19-4ffa-9a38-8a6e119f8c3e	2025-05-19	Hétfő	Kaszadella csomag	Nagy tipp	7-es kötés	_Kdl_Nag_Egyéni_1_1	Németország - Csehország	16:20 - Több, mint 4,5 (Gólszám 4,5)	1.37	32.95
564a39df-6713-4b58-a254-afe35a1f5f40	2025-05-19	Hétfő	Kaszadella csomag	Nagy tipp	7-es kötés	_Kdl_Nag_Egyéni_1_1	Boluspor - Bandirmaspor	19:00 - Boluspor vagy Döntetlen (Kétesélyes)	1.25	32.95
642486f9-8728-4346-8c4b-f59bf311f3ac	2025-05-20	Kedd	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Dup_2_1_1	Crystal Palace - Wolverhampton	21:00 - Wolverhampthon (Hendikep 0:1)	1.49	2.15
317c0df5-8d14-4531-9446-8581e9fed09b	2025-05-20	Kedd	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Dup_2_1_1	Kongsvinger - Rosenborg	20:00 - Több, mint 2,5 (Gólszám 2,5)	1.44	2.15
cd1695a9-e8b0-43f1-b7f8-ba434d9e538b	2025-05-20	Kedd	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Dup_2_1_2	Manchester City - Bournemouth	21:00 - Manchester City vagy Döntetlen (Kétesélyes)/ Több, mint 0,5 (1. félidő - Büntetőlap-szám 0,5)	1.56	2.14
40ca7632-2d57-4781-bf57-641bc61c0a3b	2025-05-20	Kedd	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Dup_2_1_2	Al-Shabab (KSA) - Al-Ittihad (KSA)	20:00 - Igen (Mindkét csapat szerez gólt)	1.37	2.14
fbee6ce2-87b9-4ff9-8295-cdac221595f6	2025-05-20	Kedd	Kaszadella csomag	Közepes tipp	2-es kötés	_Kdl_Köz_2_1_3	Supersport Utd. - Orlando Pirates	19:30 - Orlando Pirates (1X2)	1.91	2.71
f1447d5a-13da-45cd-9962-189b85adff78	2025-05-20	Kedd	Kaszadella csomag	Közepes tipp	2-es kötés	_Kdl_Köz_2_1_3	Shabab Al-Ahli (UAE) - Dibba Al-Hisn	19:00 - Shabba Al-AHli (UAE) (Hendikep 0:1)	1.42	2.71
126c8181-69ab-427f-86b1-e1489e4c3a06	2025-05-20	Kedd	Kaszadella csomag	Közepes tipp	4-es kötés	_Kdl_Köz_4_1_4	York - Oldham	20:45 - York (Ki jut tovább?)	1.37	2.60
6d9548cc-b7e1-4394-8041-d0fa31fbf702	2025-05-20	Kedd	Kaszadella csomag	Közepes tipp	4-es kötés	_Kdl_Köz_4_1_4	Crystal Palace - Wolverhampton	21:00 - Nem (Hazai csapat kapott gól nélkül játsza le a mérkőzést)	1.27	2.60
4fefba17-217c-4160-a506-9409e2eadb22	2025-05-20	Kedd	Kaszadella csomag	Közepes tipp	4-es kötés	_Kdl_Köz_4_1_4	Manchester City - Bournemouth	21:00 - Több, mint 2,5 (Büntetőlap - szám 2,5)	1.32	2.60
dd4e7481-82c3-41dd-adfb-a8683449f36d	2025-05-20	Kedd	Kaszadella csomag	Közepes tipp	4-es kötés	_Kdl_Köz_4_1_4	Egersund - Sarpsborg	18:00 - Több, mint 1,5 (Gólszám 1,5)	1.13	2.60
53c1faa2-ac97-4c20-983f-dc6fdd6b3cd5	2025-05-21	Szerda	Kasza csomag	Duplázó	1-es kötés	20250521_Kas_Dup_Egyéni_4	FTC. - Győr	20:00 - FTC (1X2)	2.00	2.00
a3fe5ec7-bcb0-491b-bc48-b0ee69862786	2025-05-21	Szerda	Kasza csomag	Közepes tipp	3-as kötés	_Kas_Köz_3_1_4	Suzhou Dongwu - Shanghai Port	13:30 - Több, mint 2,5 (Gólszám 2,5)	1.59	5.13
68f886ed-327a-4f10-861c-a5857c508f5f	2025-05-21	Szerda	Kasza csomag	Közepes tipp	3-as kötés	_Kas_Köz_3_1_4	Al-Nassr - Al-Khaleej Saihat	18:10 - Hazai és több (1X2 + Gólszám 2,5)	1.50	5.13
6c60c1b2-0dea-4e30-889a-ef60eb5e4f2f	2025-05-21	Szerda	Kasza csomag	Közepes tipp	3-as kötés	_Kas_Köz_3_1_4	Tottenham - Manchester Utd.	21:00 - Igen és több mint 2,5 (Mindkét csapat szerez gólt + Gólszám 2,5)	2.15	5.13
691505d2-00f0-4005-a611-6b6e5c794e56	2025-05-21	Szerda	Kaszadella csomag	Közepes tipp	3-as kötés	_Kdl_Köz_3_1_5	Suzhou Dongwu - Shanghai Port	13:30 - Több, mint 2,5 (Gólszám 2,5)	1.59	5.13
ac7fe256-58c7-491a-abde-922d2aa2b69d	2025-05-21	Szerda	Kaszadella csomag	Közepes tipp	3-as kötés	_Kdl_Köz_3_1_5	Al-Nassr - Al-Khaleej Saihat	18:10 - Hazai és több (1X2 + Gólszám 2,5)	1.50	5.13
c0202ffc-6229-40eb-9bdf-e75873257304	2025-05-21	Szerda	Kaszadella csomag	Közepes tipp	3-as kötés	_Kdl_Köz_3_1_5	Tottenham - Manchester Utd.	21:00 - Igen és több mint 2,5 (Mindkét csapat szerez gólt + Gólszám 2,5)	2.15	5.13
cbd9c782-2811-45be-845e-25574277e404	2025-05-21	Szerda	Kaszadella csomag	Közepes tipp	2-es kötés	_Kdl_Köz_2_1_1	Yokohama FM - Vissel Kobe	12:00 - Vissel Kobe (1X2)	1.74	2.59
00234702-1e78-4ebf-8633-0359ee411391	2025-05-21	Szerda	Kaszadella csomag	Közepes tipp	2-es kötés	_Kdl_Köz_2_1_1	Orlando - Nashville	(05.22) 1:30 - Orlando (Ki jut tovább?)	1.49	2.59
b6f89706-a761-46ad-95f4-0beaebd3fa27	2025-05-21	Szerda	Kaszadella csomag	Duplázó	3-as kötés	_Kdl_Dup_3_1_2	Dordecht - Wilem II	18:45 - Dordrecht vagy Döntetlen (Kétesélyes)	1.38	2.09
df1fd0ce-e0b5-48cf-b652-1b3599087788	2025-05-21	Szerda	Kaszadella csomag	Duplázó	3-as kötés	_Kdl_Dup_3_1_2	Utsikten - Örebro	19:00 - Utsikten vagy Döntetlen (Kétesélyes)	1.22	2.09
56a0751f-f826-4701-bd5a-57955ba8d646	2025-05-21	Szerda	Kaszadella csomag	Duplázó	3-as kötés	_Kdl_Dup_3_1_2	Örgryte - Sandviken	19:00 - Örgryte vagy Döntetlen (Kétesélyes)	1.24	2.09
bd7fb1b1-5bc3-44b4-b532-c0712d353603	2025-05-21	Szerda	Kaszadella csomag	Duplázó	3-as kötés	_Kdl_Dup_3_1_3	Kataller Toyoma - Avispa Fukuoka	12:00 - Több, mint 1,5 (Gólszám 1,5)	1.33	2.11
ba5bc086-5727-459a-8589-48758456cdf4	2025-05-21	Szerda	Kaszadella csomag	Duplázó	3-as kötés	_Kdl_Dup_3_1_3	Yamaguchi - Kashiwa R.	12:00 - Több, mint 1,5 (Gólszám 1,5)	1.29	2.11
f045d0d4-722a-4159-bc4d-4fb865d4aab9	2025-05-21	Szerda	Kaszadella csomag	Duplázó	3-as kötés	_Kdl_Dup_3_1_3	Kawasaki Frontale - Urawa RD	12:00 - Több, mint 1,5 (Gólszám 1,5)	1.23	2.11
d83a78bb-13a8-47ef-9769-a7d0c28df941	2025-05-21	Szerda	Kaszadella csomag	Duplázó	4-es kötés	_Kdl_Dup_4_1_4	Shijiazhuang Gongfu - Beijing Guoan	13:00 - Beijing Guoan (1X2)	1.21	2.09
b91acc10-2a7a-408c-a3a9-3f3418a947e8	2025-05-21	Szerda	Kaszadella csomag	Duplázó	4-es kötés	_Kdl_Dup_4_1_4	Suzhou Dongwu - Shanghai Port	13:00 - Shanghai Port (1X2)	1.25	2.09
38a96521-c78c-41e7-b454-19d2110ef922	2025-05-21	Szerda	Kaszadella csomag	Duplázó	1-es kötés	_Kdl_Dup_Egyéni_1_3	FTC - Győr	17:30 - FTC (1X2)	2.00	2.00
e4b5d6cd-dc66-41d6-a46c-e2877e5649b0	2025-05-21	Szerda	Kaszadella csomag	Duplázó	4-es kötés	_Kdl_Dup_4_1_4	Lilleström - Fredrikstad	19:00 - Több, mint 1,5 (Gólszám 1,5)	1.20	2.09
9f607183-6678-4fe6-b279-e12f17f3f722	2025-05-21	Szerda	Kaszadella csomag	Duplázó	4-es kötés	_Kdl_Dup_4_1_4	Crvena Zvezda - Vojvodina	Több, mint 1,5 (Gólszám 1,5)	1.15	2.09
908b65ee-6050-4a45-8aca-d3a3cc97b38b	2025-05-21	Szerda	Kaszadella csomag	Duplázó	3-as kötés	_Kdl_Dup_3_1_5	Liaoning Tieren - Qingdao Hainiu	13:00 - Több, mint 1,5 (Gólszám 1,5)	1.30	1.98
3befd683-3c66-4016-be08-4ed2a5016039	2025-05-21	Szerda	Kaszadella csomag	Duplázó	3-as kötés	_Kdl_Dup_3_1_5	Metz - Reims	20:00 - Több, mint 1,5 (Gólszám 1,5)	1.27	1.98
37e8a73b-4cda-4369-bcf3-1373408b0e26	2025-05-21	Szerda	Kaszadella csomag	Duplázó	3-as kötés	_Kdl_Dup_3_1_5	Turku PS - Lahti	17:30 - Több, mint 1,5 (Gólszám 1,5)	1.20	1.98
9c04f983-de0f-4605-83d2-4525408dea2e	2025-05-21	Szerda	Start csomag	Duplázó	1-es kötés	_Kdl_Dup_Egyéni_1_1	FTC - Győr	20:00 - FTC (1X2)	2.00	2.00
efe04cb5-5f81-4d8b-bfcd-4319067b80fc	2025-05-22	Csütörtök	Kaszadella csomag	Közepes tipp	2-es kötés	_Kdl_Köz_2_1_1	AZ ALkmaar - Heerenveen	18:45 - Az Alkmaar/ Az Alkmaar (Félidő/ végeredmény)	1.90	2.93
fbf492ee-58c7-487a-a7e8-cc7bd5d9f690	2025-05-22	Csütörtök	Kaszadella csomag	Közepes tipp	2-es kötés	_Kdl_Köz_2_1_1	Damac - Al-Fateh	18:15 - Igen (mindkét csapat szerez gólt)	1.54	2.93
f81ba998-4038-4157-9331-efa88b1a34d6	2025-05-22	Csütörtök	Kasza csomag	Közepes tipp	2-es kötés	_Kas_Köz_2_1_2	AZ ALkmaar - Heerenveen	18:45 - Az Alkmaar/ Az Alkmaar (Félidő/ végeredmény)	1.90	2.93
c589cc11-f3e2-43c0-99f7-7be07e0d7799	2025-05-22	Csütörtök	Kasza csomag	Közepes tipp	2-es kötés	_Kas_Köz_2_1_2	Damac - Al-Fateh	18:15 - Igen (mindkét csapat szerez gólt)	1.54	2.93
6d306010-e341-4f7f-9855-83d4933eb898	2025-05-22	Csütörtök	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Dup_2_1_3	Twente - Nijmegen	21:00 - Twente (Ki jut tovább?)	1.28	2.27
9912792b-e611-4bc0-8b02-c4ea67d9b526	2025-05-22	Csütörtök	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Dup_2_1_3	Hammerby - Mjalby	19:00 - Igen (Mindkét csapat szerez gólt)	1.77	2.27
8969ef19-2d88-4831-91b9-ba2779c713c3	2025-05-22	Csütörtök	Kasza csomag	Duplázó	2-es kötés	_Kas_Dup_2_1_4	Twente - Nijmegen	21:00 - Twente (Ki jut tovább?)	1.28	2.27
5711c8e8-9204-4f1e-9421-353694e425a8	2025-05-22	Csütörtök	Kasza csomag	Duplázó	2-es kötés	_Kas_Dup_2_1_4	Hammerby - Mjalby	19:00 - Igen (Mindkét csapat szerez gólt)	1.77	2.27
757e5f79-5cc7-4d6f-a17f-ac639e5f534c	2025-05-22	Csütörtök	Start csomag	Duplázó	2-es kötés	_St_Dup_2_1_5	Twente - Nijmegen	21:00 - Twente (Ki jut tovább?)	1.28	2.27
bdc537df-8267-4ac6-8143-59a35b3b4e69	2025-05-22	Csütörtök	Start csomag	Duplázó	2-es kötés	_St_Dup_2_1_5	Hammerby - Mjalby	19:00 - Igen (Mindkét csapat szerez gólt)	1.77	2.27
544fe64f-2101-4205-bc33-45f570ac196f	2025-05-22	Csütörtök	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Dup_2_1_6	Al-Ahli (KSA) - Al-Ettifaq	20:00 - Hazai s több (1X2 + Gólszám 1,5)	1.53	2.08
1e1063b7-3eb2-4bbe-a96e-9e124b6c113f	2025-05-22	Csütörtök	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Dup_2_1_6	AZ Alkmaar - Heerenveen	18:45 - Az Alkmaar (1X2)	1.36	2.08
a4007eaf-1cdc-4059-b7a3-d7430597d081	2025-05-22	Csütörtök	Kasza csomag	Duplázó	2-es kötés	_Kas_Dup_2_1_7	Al-Ahli (KSA) - Al-Ettifaq	20:00 - Hazai s több (1X2 + Gólszám 1,5)	1.53	2.08
a3a5d70a-dc91-40c1-a51a-b4a7a44d251a	2025-05-22	Csütörtök	Kasza csomag	Duplázó	2-es kötés	_Kas_Dup_2_1_7	AZ Alkmaar - Heerenveen	18:45 - Az Alkmaar (1X2)	1.36	2.08
9fa5b279-e50e-4356-805a-ecf96311cd5a	2025-05-22	Csütörtök	Start csomag	Duplázó	2-es kötés	_St_Dup_2_1_8	Al-Ahli (KSA) - Al-Ettifaq	20:00 - Hazai s több (1X2 + Gólszám 1,5)	1.53	2.08
beb165a1-4601-4a0e-bdc2-cccf43396715	2025-05-22	Csütörtök	Start csomag	Duplázó	2-es kötés	_St_Dup_2_1_8	AZ Alkmaar - Heerenveen	18:45 - Az Alkmaar (1X2)	1.36	2.08
c9178b0a-5d1c-4e6c-bd19-b9d632fa2037	2025-05-22	Csütörtök	Kaszadella csomag	Közepes tipp	2-es kötés	_Kdl_Köz_2_1_9	FF Malmö - AIK Stockholm	19:00 - Igen (Mindkét csapat szerez gólt)	1.89	2.80
d1cf2dd3-77dd-456e-8208-6cb40b7eb325	2025-05-22	Csütörtök	Kaszadella csomag	Közepes tipp	2-es kötés	_Kdl_Köz_2_1_9	Grasshoppers - St. Gallen	20:30 - Igen (Mindkét csapat szerez gólt)	1.48	2.80
a3fb4e2e-e3c7-4fc5-a488-d958efe39ece	2025-05-22	Csütörtök	Kaszadella csomag	Duplázó	3-as kötés	_Kdl_Dup_3_1_1	Hilleröd - Vendsyssel	19:00 - Hilleröd vagy Döntetelen	1.18	2.17
d4230610-937c-410c-b070-6d631769ce11	2025-05-22	Csütörtök	Kaszadella csomag	Duplázó	3-as kötés	_Kdl_Dup_3_1_1	Varberg - Landskrona	19:00 -Igen (Mindkét csapat szerez gólt)	1.63	2.17
a7b113fa-e7cb-43e1-b852-811a6f2fff93	2025-05-22	Csütörtök	Kaszadella csomag	Duplázó	3-as kötés	_Kdl_Dup_3_1_1	Al-Khaleej Khor Fakkan - Al-Sharjah	17:40 - Döntetlen vagy Al-Sharjah (Kétesélyes)	1.13	2.17
68848629-7015-467e-b3d7-fcf22abf5de1	2025-05-22	Csütörtök	Kaszadella csomag	Duplázó	4-es kötés	_Kdl_Dup_4_1_2	Hammarby - Mjallby	19:00 - Több, mint 1,5 (Gólszám 1,5)	1.23	2.06
64d7f95d-da71-4b59-bc23-3dfc4752c8b8	2025-05-22	Csütörtök	Kaszadella csomag	Duplázó	4-es kötés	_Kdl_Dup_4_1_2	Verberg - Landskrona	19:00 - Több, mint 1,5 (Gólszám 1,5)	1.20	2.06
e040ea51-4b0b-4067-b47a-cdc9f76f1796	2025-05-22	Csütörtök	Kaszadella csomag	Duplázó	4-es kötés	_Kdl_Dup_4_1_2	Helsingborg - Oddevold	19:00 - Több, mint 1,5 (Gólszám 1,5)	1.26	2.06
4eb6b7c3-7e8e-4052-8cd4-4328d1fe3d6a	2025-05-22	Csütörtök	Kaszadella csomag	Duplázó	4-es kötés	_Kdl_Dup_4_1_2	Al Alkmaar - Heerenveen	18:45 - Az Alkmaar vagy Döntetlen (Kétesélyes)	1.11	2.06
6dc66e16-fb29-4135-bd92-2159db448803	2025-05-22	Csütörtök	Kaszadella csomag	Közepes tipp	3-as kötés	_Kdl_Köz_3_1_3	Ludogorec Razgrad - CSZKA	18:00 - Ludogorec Razgrad vagy Döntetlen (Kétesélyes)	1.34	2.73
fbb04ee4-8eb6-4160-ae4a-beb6b74a719a	2025-05-22	Csütörtök	Kaszadella csomag	Közepes tipp	3-as kötés	_Kdl_Köz_3_1_3	Hilleröd - Vendsyssel	19:00 - Hilleröd (Döntetlennél a tét visszajár)	1.33	2.73
4a611b00-938a-400c-9a7e-9621ebdc62ab	2025-05-22	Csütörtök	Kaszadella csomag	Közepes tipp	3-as kötés	_Kdl_Köz_3_1_3	Magdeburg - Eisenach	19:00 - Madgeburg -4,5 (Hendikep -4,5)	1.53	2.73
a8fbfb8c-9e26-44f4-b3e4-4b9bd617de52	2025-05-23	Péntek	Kaszadella csomag	Közepes tipp	4-es kötés	_Kdl_Köz_4_1_2	Cercle Bruges - Eisden Maasmechelen	20:45 - Több, mint 2,5 (Gólszám 2,5)	1.59	5.50
0e4c420f-deff-495d-a221-43c390ab2da4	2025-05-23	Péntek	Kaszadella csomag	Közepes tipp	4-es kötés	_Kdl_Köz_4_1_2	Betis - Valencia	21:00 - Igen (Mindkét csapat szerez gólt)	1.53	5.50
918c97af-8a09-4bc8-b407-14df62bf4ca8	2025-05-23	Péntek	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Dup_2_1_1	Como - Internazionale	20:45 - Internazionale (1X2)	1.52	2.33
7036dce5-1d5f-473e-a00c-67b1457ff31a	2025-05-23	Péntek	Kaszadella csomag	Közepes tipp	4-es kötés	_Kdl_Köz_4_1_2	Napoli - Calgiari	20:45 - Hazai és több (1X2 + Gólszám 2,5)	1.56	5.50
4c4a5778-0d35-471a-adc4-180ae995bb8d	2025-05-23	Péntek	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Dup_2_1_1	Betis - Valencia	21:00 - Több, mint 2,5 (Gólszám 2,5)	1.53	2.33
f46b5665-6e8b-4620-98d5-82c741a75ccc	2025-05-23	Péntek	Kaszadella csomag	Közepes tipp	4-es kötés	_Kdl_Köz_4_1_2	Paks - Kecskemét	20:15 - Paks (1X2)	1.45	5.50
fc73e0e6-82db-4c54-8905-647e7c98e2b3	2025-05-22	Csütörtök	Kaszadella csomag	Duplázó	1-es kötés	_Kdl_Dup_Egyéni_1_4	Heidenheim - Elvesberg	20:30 - Igen és több, mint 2,5 (Mindkét csapat szerez gólt + Gólszám 2,5)	2.03	2.03
c3863e49-a4ff-419c-bca6-dd989048ad81	2025-05-23	Péntek	Kaszadella csomag	Duplázó	1-es kötés	_Kdl_Dup_Egyéni_1_1	Derry City - Shamroch Rovers	20:45 - Igen (Minkét csapat szerez gólt)	1.98	1.98
38b019df-1b4e-4be4-b165-1b5f446b6029	2025-05-23	Péntek	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Dup_2_1_2	Como - Internazionale	20:45 - Igen (Mindkét csapat szerez gólt)	1.61	1.92
02a2b857-5735-4fba-987f-cc73046af092	2025-05-23	Péntek	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Dup_2_1_2	Saarbrücken - Braunschweig	20:30 - Több, mint 1,5 (Gólszám 1,5)	1.19	1.92
7a2c3bc5-defb-4225-b40d-2cb9a6d63f7d	2025-05-23	Péntek	Kaszadella csomag	Közepes tipp	2-es kötés	_Kdl_Köz_2_1_3	Karlberg - Hammarby Talang	19:00 - Hammarby Talang (Döntetlennél a tét visszajár)	1.54	2.66
5f22a0ca-07e3-4a73-81f1-bb74c6ed6b87	2025-05-23	Péntek	Kaszadella csomag	Közepes tipp	2-es kötés	_Kdl_Köz_2_1_3	Torslanda - Trollhattan	19:00 - Troslanda (Düntetlennél a tét visszajár)	1.73	2.66
276a4d09-5ec7-449a-a629-6ecc9b0b17d7	2025-05-23	Péntek	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Dup_2_1_4	Anyang - Pohang	12:30 - Igen (Mindkét csapat szerez gólt)	1.63	2.02
3eaa685d-0cf7-4d65-ba4e-7973c4f69a17	2025-05-23	Péntek	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Dup_2_1_4	Jeju - Jeonbuk	12:30 - Döntetlen vagy Jeonbuk (Kétesélyes)	1.24	2.02
0a68940d-e2cb-40cb-bbe6-58450bb079c8	2025-05-23	Péntek	Kaszadella csomag	Duplázó	3-as kötés	_Kdl_Dup_3_1_5	Paks - Kecskemét	20:15 - Kevesebb, mint 4,5 (Gólszám 4,5)	1.26	2.13
f89a6073-44d2-4802-9f76-c31e2a415bc8	2025-05-23	Péntek	Kaszadella csomag	Duplázó	3-as kötés	_Kdl_Dup_3_1_5	Keflavik - Leiknir R.	21:15 - Keflavik (1X2)	1.42	2.13
2a9c0d66-e5d7-4994-ab20-966f1edde681	2025-05-23	Péntek	Kaszadella csomag	Duplázó	3-as kötés	_Kdl_Dup_3_1_5	Saarbrücken - Braunschweig	20:30 - Több, mint 1,5 (Gólszám 1,5)	1.19	2.13
f3262fa7-d610-4663-b6c6-bed6952d40aa	2025-05-23	Péntek	Kaszadella csomag	Közepes tipp	3-as kötés	20250523_Kdl_Köz_3_7	Betis - Valencia	21:00 - Igen (Mindkét csapat szerez gólt)	1.53	2.70
2d92917a-c359-4ab8-a26e-20067b2d437b	2025-05-23	Péntek	Kaszadella csomag	Közepes tipp	3-as kötés	20250523_Kdl_Köz_3_7	HK Kopavogs - Njardvík	21:15 - Igen (Mindkét csapat szerez gólt)	1.52	2.70
32d88986-a94e-4b88-a380-16e76351a561	2025-05-23	Péntek	Kaszadella csomag	Közepes tipp	3-as kötés	20250523_Kdl_Köz_3_7	Independiente del Valle - Mushuc Runa	23:30 - Több, mint 1,5 (Gólszám 1,5)	1.16	2.70
cab8c8a5-fcda-45d1-b483-63962d1edb57	2025-05-23	Péntek	Kaszadella csomag	Nagy tipp	5-ös kötés	_Kdl_Nag_Egyéni_1_7	KTP - Haka	17:00 - Köntetlen vagy Haka (Kétesélyes)	1.32	5.35
d259df30-c7d6-42fc-bb72-368d790ce310	2025-05-23	Péntek	Kaszadella csomag	Nagy tipp	5-ös kötés	_Kdl_Nag_Egyéni_1_7	LASK - Altach	19:30 - Kevesebb, mint 3,5 (Gólszám 3,5)	1.32	5.35
95d2bbcf-1030-454a-833f-be3ef2814061	2025-05-23	Péntek	Kaszadella csomag	Nagy tipp	5-ös kötés	_Kdl_Nag_Egyéni_1_7	Aarau - Stade Nyonnais	20:15 - Igen (Mindkét csapat szerez gólt)	1.49	5.35
7b296c40-1366-47e1-ace9-138004909d36	2025-05-23	Péntek	Kaszadella csomag	Nagy tipp	5-ös kötés	_Kdl_Nag_Egyéni_1_7	Schaffhausen - Bellinzona	20:15 - Igen (Mindkét csapat szerez gólt)	1.56	5.35
761fe1b0-0b86-4dec-a5cd-90dc1f868ada	2025-05-23	Péntek	Kaszadella csomag	Nagy tipp	5-ös kötés	_Kdl_Nag_Egyéni_1_7	Barcelona Guayaquil - Dep. Cucenca	(05.24) 02:00 - Barcelona Guayaquil (1X2)	1.32	5.35
6f30a97c-d337-450a-8a1e-42accf605002	2025-05-25	Vasárnap	Kaszadella csomag	Közepes tipp	3-as kötés	_Kdl_Köz_3_1_6	Tenerife - Oviedo	18:30 - Döntetlen vagy Oviedo (Kétesélyes)	1.15	2.66
5f1eb25f-df59-4b66-990e-2cae944e0bfa	2025-05-25	Vasárnap	Kaszadella csomag	Közepes tipp	3-as kötés	_Kdl_Köz_3_1_6	Dukla Praha - Ceske Budejovice	16:00 - Dukla Praha (1X2)	1.37	2.66
30602347-8ec9-48db-9ae8-2699778a4202	2025-05-23	Péntek	Kaszadella csomag	Nagy tipp	3-as kötés	_Kdl_Nag_3_1_3	Austira Klagenfurt - Hartberg	19:30 - Igen és több, mint 2,5 (Mindkét csapat szerez gólt + Gólszám 2,5)	2.19	11.91
078ea675-4d44-4912-a172-e9a05c677531	2025-05-23	Péntek	Kaszadella csomag	Nagy tipp	3-as kötés	_Kdl_Nag_3_1_3	Como - Internazionale	20:45 - Több, mint 2,5 (Gólszám 2,5)/ Több, mint 8,5 (Szöglet 8,5)/ Igen (Mindkét csapat szerez gólt)	3.42	11.91
894491f5-fe88-48e4-9c35-4769d36ebc97	2025-05-23	Péntek	Kaszadella csomag	Nagy tipp	3-as kötés	_Kdl_Nag_3_1_3	Cercle Bruges - Eisden Maasmechelen	20:45 - Cercle Bruges (1X2)	1.59	11.91
d4dffd12-c4a7-4fa4-8057-210896e915d3	2025-05-24	Szombat	Kaszadella csomag	Közepes tipp	3-as kötés	_Kdl_Köz_3_1_1	Fehérvár - DVSC	17:30 - Igen (Mindkét csapat szerez gólt)	1.60	2.54
55995900-8383-43a2-9200-971ee825b197	2025-05-24	Szombat	Kaszadella csomag	Közepes tipp	3-as kötés	_Kdl_Köz_3_1_1	Alavés - Osasuna	21:00 - Döntetlen vagy Osasuna (Kétesélyes)	1.30	2.54
3f8b7ee2-d6e3-481c-b509-3e13c767b60e	2025-05-24	Szombat	Kaszadella csomag	Közepes tipp	3-as kötés	_Kdl_Köz_3_1_1	Göztepe Izmír - Galatasaray	18:00 - Döntetlen vagy Galatasaray (Kétesélyes)	1.22	2.54
1b658252-4a7c-4e9d-887d-733b07139d4b	2025-05-24	Szombat	Kaszadella csomag	Duplázó	3-as kötés	_Kdl_Dup_3_1_2	Rakow Czestochowa - Widzew Lodz	17:30 - Kevesebb, mint 4,5 (Gólszám 4,5)	1.21	2.10
9b458f31-758f-4534-bc65-f7173270461d	2025-05-24	Szombat	Kaszadella csomag	Duplázó	3-as kötés	_Kdl_Dup_3_1_2	Silkeborg - Viborg	15:00 - Igen (Mindkét csapat szerez gólt)	1.42	2.10
55d3b09d-329a-42bd-ab0b-57aa7b70fb98	2025-05-24	Szombat	Kaszadella csomag	Duplázó	3-as kötés	_Kdl_Dup_3_1_2	Cape Town City - Stellenbosch	15:00 - Döntetlen vagy Stellenbosch	1.22	2.10
fbdd27dd-abf3-4baa-b216-2dd8ed060153	2025-05-24	Szombat	Kaszadella csomag	Duplázó	3-as kötés	_Kdl_Dup_3_1_3	Paris SG - Reims	21:00 - Több, mint 0,5 (1. félidő - Büntetőlap-szám 0,5)	1.46	2.43
bf960468-51a8-4507-9d0c-291e95c7ad14	2025-05-24	Szombat	Kaszadella csomag	Duplázó	3-as kötés	_Kdl_Dup_3_1_3	Göztepe Izmír - Galatasaray	18:00 - Több, mint 1,5 (Véndégcsapat - Gólszám 1,5)	1.46	2.43
6cb66bca-92b9-4db1-a7a1-920e00f7ebd4	2025-05-24	Szombat	Kaszadella csomag	Duplázó	3-as kötés	_Kdl_Dup_3_1_3	Fortaleza Cota - Union Magdalena	23:00 - Forzatela Cota vagy Döntetlen (Kétesélyes)	1.14	2.43
6ae24b34-7b92-475c-940c-2cc8610d9109	2025-05-24	Szombat	Kaszadella csomag	Duplázó	3-as kötés	_Kdl_Dup_3_1_4	Győr - FTC	20:00 - Döntetlen vagy FTC (Kétesélyes)	1.18	2.40
e216a269-62b4-4876-b831-591848ad2eaa	2025-05-24	Szombat	Kaszadella csomag	Duplázó	3-as kötés	_Kdl_Dup_3_1_4	Fehérvár - DVSC	17:30 - Igen (Mindkét csapat szerez gólt)	1.60	2.40
869f1da2-1b7b-4cf6-ae51-4a302e7bcc7a	2025-05-24	Szombat	Kaszadella csomag	Duplázó	3-as kötés	_Kdl_Dup_3_1_4	MTK - Újpest	15:00 - MTK vagy Döntetlen (Kétesélyes)	1.27	2.40
f70974b8-e8ec-4cb5-ae33-dfa3aa6510c8	2025-05-24	Szombat	Kaszadella csomag	Közepes tipp	2-es kötés	20250524_Kdl_Köz_2_6	Göztepe Izmír - Galatasaray	18:00 - Több, mint 1,5 (Vendégcsapat - Gólszám 1,5)	1.46	2.01
1103e6ff-2f20-4fee-953e-c2a5d09ee680	2025-05-25	Vasárnap	Kaszadella csomag	Közepes tipp	2-es kötés	_Kdl_Köz_2_1_7	AZ Alkmaar - Twente	18:00 - Igen (Mindkét csapat szerez gólt)	1.62	2.53
011ff0d5-d5b5-4b9e-8936-d9c0c45a0365	2025-05-25	Vasárnap	Kaszadella csomag	Közepes tipp	2-es kötés	_Kdl_Köz_2_1_7	Benfica - Sporting CP	18:15 - Igen (Mindkét csapat szerez gólt)	1.56	2.53
9c1bb909-5f8a-4530-a0f0-c8f5114a3cad	2025-05-25	Vasárnap	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Dup_2_1_8	Nottingham - Chelsea	17:00 - Igen (Mindkét csapat szerez gólt)	1.53	2.10
e4f3e3e4-1e89-47cf-ad73-5af917bbaf32	2025-05-25	Vasárnap	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Dup_2_1_8	Southampton - Arsenal	17:00 - Több, mint 2,5 (Gólszám 2,5)	1.37	2.10
c32bfb6e-bb52-4828-a573-2dde85b8c115	2025-05-25	Vasárnap	Kaszadella csomag	Nagy tipp	5-ös kötés	_Kdl_Nag_Egyéni_1_9	Atalanta - Parmo	20:45 - Atalanta (1X2)	1.58	9.00
f98d1d9e-0792-4887-b8b6-7c7c07e31066	2025-05-24	Szombat	Kaszadella csomag	Közepes tipp	2-es kötés	20250524_Kdl_Köz_2_6	Paris SG - Reims	21:00 - Több, mint 0,5 (1. félidő - Büntetőlap-szám 0,5)	1.38	2.01
94e06812-51bf-4edf-acfd-f7c410f67a6a	2025-05-24	Szombat	Kaszadella csomag	Nagy tipp	3-as kötés	_Kdl_Nag_3_1_6	Győr - FTC	20:00 - Több, mint 2,5 (Gólszám 2,5)	1.44	5.28
79cea2e4-8402-4fd6-87c1-674fb9145adc	2025-05-24	Szombat	Kaszadella csomag	Nagy tipp	3-as kötés	_Kdl_Nag_3_1_6	Real Madrid - Real Sociedad	16:15 - Igen (Mindkét csapat szerez gólt)/ Több, mint 6,5 (Hazai cspat szögletszám 6,5)	2.78	5.28
b0f9031c-3737-4e0d-bfaf-d6a8cc24481a	2025-05-24	Szombat	Kaszadella csomag	Nagy tipp	3-as kötés	_Kdl_Nag_3_1_6	Alavés - Osasuna	21:00 - 1-3 (Vendégcsapat - Gólszámok)	1.32	5.28
e76a4c02-7ce2-45e3-8d88-87cd4d2a3e55	2025-05-24	Szombat	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Dup_2_1_7	Aberdeen - Celic	16:00 - Több, mint 2,5 (Gólszám 2,5)	1.41	1.99
7bd752f3-144f-4b11-9c1f-827148fd1381	2025-05-24	Szombat	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Dup_2_1_7	Salzburg - Rapid Wien	17:00 - Több, mint 2,5 (Gólszám 2,5)	1.41	1.99
6fa703c1-d03d-483e-b9fb-bdf2d4cafa68	2025-05-24	Szombat	Kaszadella csomag	Nagy tipp	4-es kötés	_Kdl_Nag_4_1_8	Silkeborg - Viborg	15:00 - Igen és több, mint 2,5 (Mindkét csapat szerez gólt + Gólszám 2,5)	1.66	10.89
cdd7289c-3473-4244-bdee-b285542aba12	2025-05-24	Szombat	Kaszadella csomag	Nagy tipp	4-es kötés	_Kdl_Nag_4_1_8	Lyngby - Aalborg	15:00 - Igen és több, mint 2,5 (Mindkét csapat szerez gólt + Gólszám 2,5)	1.76	10.89
f3b23a84-0636-47de-873c-36f0b069b882	2025-05-24	Szombat	Kaszadella csomag	Nagy tipp	4-es kötés	_Kdl_Nag_4_1_8	Real Madrid - Real Sociedad	16:15 - Igen és több, mint 2,5 (Mindkét csapat szerez gólt + Gólszám 2,5)	1.80	10.89
bb2637ca-54d0-40ac-9183-83e794a6e7ea	2025-05-24	Szombat	Kaszadella csomag	Nagy tipp	4-es kötés	_Kdl_Nag_4_1_8	Sturm Graz - Wolfsberg	17:00 - Igen és több, mint 2,5 (Mindkét csapat szerez gólt + Gólszám 2,5)	2.07	10.89
02735923-bd6e-4d53-9879-402bfb91ac67	2025-05-24	Szombat	Kaszadella csomag	Extra hétvégi	9-es kötés	_Kdl_Ext_9_1_9	FC Köbenhavn - Nordsjaelland	(05.25) 17:00 - FC Köbenhavn (1X2)	1.36	38.35
363c17a0-326c-446a-adf1-c534c42df762	2025-05-24	Szombat	Kaszadella csomag	Extra hétvégi	9-es kötés	_Kdl_Ext_9_1_9	Bologna - Torino	18:00 - Több, mint 2,5 (Gólszám 2,5)	1.57	38.35
fbe0da43-226e-43af-9b82-1fc01d4a7811	2025-05-24	Szombat	Kaszadella csomag	Extra hétvégi	9-es kötés	_Kdl_Ext_9_1_9	Torino - Roma	(05.25) 20:45 - Roma (1X2)	1.43	38.35
46d63e9e-a87f-4b69-aff0-1aca2f348e9a	2025-05-24	Szombat	Kaszadella csomag	Extra hétvégi	9-es kötés	_Kdl_Ext_9_1_9	Atalanta - Parma	(05.25) 20:45 - Több, mint 2,5 (Gólszám 2,5)	1.55	38.35
9bd017be-282a-431e-948b-778f9ce1c0ca	2025-05-24	Szombat	Kaszadella csomag	Extra hétvégi	9-es kötés	_Kdl_Ext_9_1_9	Manchester Utd. - Aston Villa	(05.25) 17:00 - Aston Villa (1X2)	1.65	38.35
eeab32b3-d7f1-4ec7-8c8b-c1c2d53c77a5	2025-05-24	Szombat	Kaszadella csomag	Extra hétvégi	9-es kötés	_Kdl_Ext_9_1_9	Arsenal N - Barcelona N	18.00 - Igen (Ewa Pajor kezdőként szerez gólt?)	1.65	38.35
92e46315-30aa-4f71-ba15-e6b8fa9b1603	2025-05-24	Szombat	Kaszadella csomag	Extra hétvégi	9-es kötés	_Kdl_Ext_9_1_9	Puskás Akadémia - Diósgyőr	20:00 - Kevesebb, mint 4,5 (Gólszám 4,5)	1.36	38.35
d225a1b5-2aa8-4d2c-bcc7-dd64a6e1c4bc	2025-05-24	Szombat	Kaszadella csomag	Extra hétvégi	9-es kötés	_Kdl_Ext_9_1_9	Nottingham - Chelsea	(05.25) 17:00 - Igen (Mindkét csapat szerez gólt)	1.52	38.35
1fc4d9a5-0916-4eac-89a3-0bd2f4d45f53	2025-05-24	Szombat	Kaszadella csomag	Extra hétvégi	9-es kötés	_Kdl_Ext_9_1_9	Ath. Bilbao - Barcelona	(05.25) 17:00 -  Igen (Mindkét csapat szerez gólt)	1.44	38.35
67370210-b691-4577-8575-c9cd67653092	2025-05-24	Szombat	Kaszadella csomag	Duplázó	3-as kötés	20250524_Kdl_Dup_3_5	Astria Wien - BW Linz	17:00 - Austria Wien (1X2)	1.26	2.18
f3c29670-ce80-4940-bdd0-c444a48204d6	2025-05-24	Szombat	Kaszadella csomag	Duplázó	3-as kötés	20250524_Kdl_Dup_3_5	Real Madrid - Real Sociedead	16:15 - Real Madrid (1X2)	1.30	2.18
1244e8b3-d062-40ed-ae86-d8032e6ab4c7	2025-05-24	Szombat	Kaszadella csomag	Duplázó	3-as kötés	20250524_Kdl_Dup_3_5	Alcoyano - Real Madrid B	19:00 - Real Madrid B (Hendikep 0:2)	1.33	2.18
35f4d852-85a7-40bd-83ab-4eb911eacb79	2025-05-24	Szombat	Kaszadella csomag	Közepes tipp	4-es kötés	_Kdl_Köz_4_1_11	Westerlo - Standard Liege	20:00 - Több, mint 2,5 (Gólszám 2,5)	1.42	3.99
6e2cf6e2-f70d-4914-af5c-d416a2b5eb11	2025-05-24	Szombat	Kaszadella csomag	Közepes tipp	4-es kötés	_Kdl_Köz_4_1_11	Győr - FTC	20:00 - FTC (1X2)	1.70	3.99
b59ae47a-1b5d-40b8-89ca-cdf9046c4d56	2025-05-24	Szombat	Kaszadella csomag	Közepes tipp	4-es kötés	_Kdl_Köz_4_1_11	Paris SG - Reims	21:00 - Több, mint 2,5 (Gólszám 2,5)	1.30	3.99
45b78196-fa4b-443b-a453-932558091936	2025-05-24	Szombat	Kaszadella csomag	Közepes tipp	4-es kötés	_Kdl_Köz_4_1_11	Getafe - Celta Vigo	21:00 - Több, mint 1,5 (Gólszám 1,5)	1.27	3.99
3b009de7-f673-4777-b1e6-2da3e41d7826	2025-05-24	Szombat	Kaszadella csomag	Duplázó	3-as kötés	_Kdl_Dup_3_1_1	Jagiellonia Bialystok - Pgon Szczecin	17:30 - Jagellonia Bialystok vagy Döntetelen (Kétesélyes)	1.30	1.95
4895249f-2a98-425e-b0a2-08ffab56b61e	2025-05-24	Szombat	Kaszadella csomag	Duplázó	3-as kötés	_Kdl_Dup_3_1_1	Bryne - Fredrikstad	16:00 - Kevesebb, mint 3,5 (Gólszám 3,5)	1.22	1.95
9b955245-0a28-4b66-b886-072b70827223	2025-05-24	Szombat	Kaszadella csomag	Duplázó	3-as kötés	_Kdl_Dup_3_1_1	Östersund FK - Örebro	15:00 - Több, mint 1,5 (Gólszám 1,5)	1.23	1.95
6358ebb5-9bee-497c-8b0e-cfe44043daf9	2025-05-25	Vasárnap	Kaszadella csomag	Duplázó	1-es kötés	_Kdl_Dup_Egyéni_1_1	Ath. Bilbao - Barcelona	21:00 - Barcelona -0,5 (Szöglet hendikep 0,5)	2.15	2.15
e58a6b94-781a-4a2f-9ae4-04889bb9f504	2025-05-25	Vasárnap	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Dup_2_1_2	Ath. Bilbao - Barcelona	21:00 - Több, mint 1,5 (Büntetőlap - szám 1,5)	1.52	2.26
0a17893a-f883-4a7b-8200-cf05f3d1a3e2	2025-05-25	Vasárnap	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Dup_2_1_2	Fullham - Manchester City	17:00 - Manchester City (1X2)	1.49	2.26
ea6e8a6e-ce70-49d9-ba89-76812c3afdfc	2025-05-25	Vasárnap	Start csomag	Duplázó	3-as kötés	_St_Dup_3_1_4	NC Magra - Kabylie	18:00 - Kevesebb, mint 3,5 (Gólszám 3,5)	1.34	2.35
32702d7b-762a-4223-b0d6-9d7fef4723e5	2025-05-25	Vasárnap	Start csomag	Duplázó	3-as kötés	_St_Dup_3_1_4	Austria Lustenau - Voitsberg	17:00 - Kevesebb, mint 3,5 (Gólszám 3,5)	1.34	2.35
acfcc59b-25cd-4b11-97b0-83cc71244158	2025-05-25	Vasárnap	Start csomag	Duplázó	3-as kötés	_St_Dup_3_1_4	Nyíregyháza - ZTE	14:15 - Kevesebb, mint 3,5 (Gólszám 3,5)	1.31	2.35
5d8b0c04-2b99-4ec6-a043-e67ef6b08683	2025-05-25	Vasárnap	Kaszadella csomag	Nagy tipp	1-es kötés	_Kdl_Nag_Egyéni_1_5	Ath. Bilbao - Barcelona	21:00 - Igen (Mindkét csapat szerez gólt)/ Barcelona -0,5 (Szöglet hendikep -0,5)/ Több, mint 0,5 (1.félidő - Büntetőlap-szám 0,5)	5.89	5.89
8a7f553a-f605-4492-9456-48b2f6c57751	2025-05-25	Vasárnap	Kaszadella csomag	Közepes tipp	3-as kötés	_Kdl_Köz_3_1_6	Osijek - Istra	17:00 - Igen (Mindkét csapat szerez gólt)	1.69	2.66
1fd03be1-08bb-4900-97f2-055ac303368d	2025-05-25	Vasárnap	Kaszadella csomag	Nagy tipp	5-ös kötés	_Kdl_Nag_Egyéni_1_9	Torino - Roma	20:45 - Roma (1X2)	1.42	9.00
caf50551-5ed4-4a62-9489-efdce0db6fa3	2025-05-25	Vasárnap	Kaszadella csomag	Duplázó	3-as kötés	_Kdl_Dup_3_1_32	Atalanta - Parma	20:45 - Atalanta vagy Döntetelen Kétesélyes)	1.17	2.19
7df5d774-1d38-4445-b824-e0d9802ae936	2025-05-25	Vasárnap	Kaszadella csomag	Duplázó	3-as kötés	_Kdl_Dup_3_1_32	Torino - Roma	20:45 - Roma (1X2)	1.43	2.19
0502892b-8944-4a8e-a5c3-5ebca6de2d66	2025-05-25	Vasárnap	Kaszadella csomag	Nagy tipp	5-ös kötés	_Kdl_Nag_Egyéni_1_9	Girona - Atl. Madrid	14:00 - Atl. Madrid (1X2)	1.81	9.00
f3101157-3800-45d9-a8c7-8e5f176e56bb	2025-05-25	Vasárnap	Kaszadella csomag	Nagy tipp	5-ös kötés	_Kdl_Nag_Egyéni_1_9	Ath. Bilbao - Barcelona	21:00 - Több, mint 2,5 (Gólszám 2,5)	1.42	9.00
07e5892b-712a-4cf9-a320-9d38fd55eb8b	2025-05-25	Vasárnap	Kaszadella csomag	Nagy tipp	5-ös kötés	_Kdl_Nag_Egyéni_1_9	Genk - Anderlecht	18:30 - Több, mint 2,5 (Gólszám 2,5)	1.56	9.00
0fee6efb-30d0-49f2-a03c-d88a58dba242	2025-05-25	Vasárnap	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Dup_2_1_10	Manchester Utd. - Aston Villa	17:00 - Több, mint 2,5 (Gólszám 2,5)	1.53	2.20
2e01616c-44e9-49c5-a5ba-ff8cd131e7f3	2025-05-25	Vasárnap	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Dup_2_1_10	Wolverhampton - Brentford	17:00 - Több, mint 2,5 (Gólszám 2,5)	1.44	2.20
94b5cfd2-7864-4719-9eb7-e76b4d715669	2025-05-25	Vasárnap	Kaszadella csomag	Közepes tipp	3-as kötés	_Kdl_Köz_3_1_11	Ipswich - West Ham	17:00 - West Ham (1X2)	1.95	5.57
d82e246d-54c7-4ea0-893b-9211d4b12320	2025-05-25	Vasárnap	Kaszadella csomag	Közepes tipp	3-as kötés	_Kdl_Köz_3_1_11	Manchester Utd. - Aston Villa	17:00 - Aston Villa (1X2)	1.67	5.57
89bbcee7-7c16-44d6-9b47-ebaa7e90c25d	2025-05-25	Vasárnap	Kaszadella csomag	Közepes tipp	3-as kötés	_Kdl_Köz_3_1_11	Udinese - Fiorentina	Igen (Mindkét csapat szerez gólt)	1.71	5.57
5ac83a44-643e-4742-a1d9-feac3895b0b6	2025-05-25	Vasárnap	Kaszadella csomag	Közepes tipp	3-as kötés	_Kdl_Köz_3_1_1	Torino - Roma	20:45 - Roma (1X2)	1.42	2.76
6ddbf7ca-6c60-4d25-a151-ac430f7a1668	2025-05-25	Vasárnap	Kaszadella csomag	Közepes tipp	3-as kötés	_Kdl_Köz_3_1_1	Venezia - Juventus	20:45 - Juventus (1X2)	1.43	2.76
df38255a-35ae-447a-b76c-40e11dcc147d	2025-05-25	Vasárnap	Kaszadella csomag	Közepes tipp	3-as kötés	_Kdl_Köz_3_1_1	Haugesund - Brann Bergen	19:15 - Brann Bergen (1X2)	1.36	2.76
c8a86918-65a6-4c5c-b08b-a45453b7df55	2025-05-25	Vasárnap	Kaszadella csomag	Nagy tipp	3-as kötés	_Kdl_Nag_3_1_2	Manchester Utd. - Aston Villa	17:00 - Vendég és kevesebb (1X2 + Gólszám 4,5)	2.17	6.23
c3125ff6-2926-4401-8d16-345acf7c5d05	2025-05-25	Vasárnap	Kaszadella csomag	Nagy tipp	3-as kötés	_Kdl_Nag_3_1_2	FC Köbenhavn - Nordsjaelland	17:00 - Hazai és több (1X2 + Gólszám 1,5)	1.64	6.23
1546a295-da1b-40e4-8db1-b1805a691faf	2025-05-25	Vasárnap	Kaszadella csomag	Nagy tipp	3-as kötés	_Kdl_Nag_3_1_2	Midtylland - Randers	Hazai és több (1X2 + Gólszám 1,5)	1.75	6.23
2481c980-a151-46da-9ba9-41d7670fb0e3	2025-05-25	Vasárnap	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Dup_2_1_4	Az Alkmaar - Twente	18:00 - Igen (Mindkét csapat szerez gólt)	1.62	1.99
e3665c7e-5071-4ee6-a4da-6f315e761460	2025-05-25	Vasárnap	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Dup_2_1_4	Kayserispor - Bodrumspor	18:00 - Kayserispor (Hendikep 2:0)	1.23	1.99
caada0aa-76c3-45f1-bc4f-fcba2009d4b9	2025-05-25	Vasárnap	Kaszadella csomag	Közepes tipp	3-as kötés	_Kdl_Köz_3_1_5	Southampton - Arsenal	17:00 - Southampton (Hendikep 3:0)	1.45	3.31
3e2dfa37-4c84-41e4-b912-d82c146785b0	2025-05-25	Vasárnap	Kaszadella csomag	Közepes tipp	3-as kötés	_Kdl_Köz_3_1_5	Fulham - Manchester City	17:00 - Manchester City (1X2)	1.49	3.31
cc833caa-8b13-4398-b2c0-9b89e980ac98	2025-05-25	Vasárnap	Kaszadella csomag	Közepes tipp	3-as kötés	_Kdl_Köz_3_1_5	Nottingham - Chelsea	17:00 - Igen (Mindkét csapat szerez gólt)	1.53	3.31
a080a3ae-ab08-4969-a8e4-5df6e50f7c81	2025-05-25	Vasárnap	Kaszadella csomag	Duplázó	3-as kötés	_Kdl_Dup_3_1_32	Nottingham - Chelsea	17:00 - Döntetlen vagy Chelsea (Kétesélyes)	1.31	2.19
bb305787-7f75-4479-a1c6-c32ec22985f1	2025-05-25	Vasárnap	Kaszadella csomag	Duplázó	3-as kötés	_Kdl_Dup_3_1_3	FC Bruges - Antwerpen	18:30 - Hazai és több (1X2 + Gólszám 1,5)	1.30	2.01
52b96e17-712a-4bba-8ba8-aad0119de395	2025-05-25	Vasárnap	Kaszadella csomag	Duplázó	3-as kötés	_Kdl_Dup_3_1_3	Ried - FC Vienna	17:00 - Ried (1X2)	1.29	2.01
db7da57a-1a45-4e91-a43a-16126961e061	2025-05-25	Vasárnap	Kaszadella csomag	Duplázó	3-as kötés	_Kdl_Dup_3_1_3	Kristiansund - Viking Stavanger	17:00 - Döntetlen vagy Viking Stavanger (Kétesélyes)	1.20	2.01
620bcc3f-4b8d-4630-b995-c6500fba7c47	2025-05-26	Hétfő	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Dup_2_1_1	Nörrköping - Mjalby	19:00 - Döntetlen vagy Mjalby (Kétesélyes)	1.29	2.04
a98d0524-c686-4f80-893d-807d16000adc	2025-05-26	Hétfő	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Dup_2_1_1	Al-Faya - Al-Shabab (KSA)	20:00 - Igen (Mindkét csapat szerez gólt)	1.58	2.04
48ee6d15-3ae3-42f2-9701-ec06bc457bdf	2025-05-26	Hétfő	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Dup_2_1_2	Ludogorec Razgad - Arda Kardzsali	06:45 - Ludogorec Razgead vagy Döntetlen (Kétesélyes)	1.53	1.94
455ad44d-2153-4b5f-9d00-294f048cbff9	2025-05-26	Hétfő	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Dup_2_1_2	USM Alger - Olympique Akbou	21:00 - Kevesebb, mint 3,5 (Gólszám 3,5)	1.27	1.94
9327a963-bdd5-4f2d-b65d-8f3597b3ee18	2025-05-26	Hétfő	Kaszadella csomag	Duplázó	2-es kötés	20250526_Kdl_Dup_2_4	Al-Hilal (KSA) - Al-Qadisiyah	20:00 - Igen és több, mint 2,5 (Mindkét csapat szerez gólt + Gólszám 2,5)	1.56	2.09
29f00afe-b71a-4b3a-b0c7-3538f2a7144d	2025-05-26	Hétfő	Kaszadella csomag	Duplázó	2-es kötés	20250526_Kdl_Dup_2_4	Al-Ittihad (KSA) - Damac	20:00 - Több, mint 2,5 (Gólszám 2,5)	1.34	2.09
e2074542-f108-4ac1-9582-6737e919f08e	2025-05-26	Hétfő	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Dup_2_1_4	Hammarby - Degerfors	19:10 - Több, mint 2,5 (Gólszám 2,5)	1.54	2.28
98b287f6-37e4-4f77-ab06-301b0c392463	2025-05-26	Hétfő	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Dup_2_1_4	Al-Hilal (KSA) - Al-Qadisiyah	20:00 - Al-Hilala (1X2)	1.48	2.28
2c3bd915-516b-4f7c-b9d8-d9953a819160	2025-05-26	Hétfő	Kaszadella csomag	Közepes tipp	4-es kötés	_Kdl_Köz_4_1_5	Al-Riyadh - Al-Ahli (KSA)	20:00 - Több, mint 2,5 (Gólszám 2,5)	1.35	4.95
8b03cd4b-8094-468e-bfd9-a264cb46e3f5	2025-05-26	Hétfő	Kaszadella csomag	Közepes tipp	4-es kötés	_Kdl_Köz_4_1_5	Al-Fateh - Al-Nassr	20:00 - Al-Nassr (1X2)	1.39	4.95
82684476-2e48-4cf2-8d78-587efbaebe6f	2025-05-26	Hétfő	Kaszadella csomag	Közepes tipp	4-es kötés	_Kdl_Köz_4_1_5	Al-Fayah - Al-Shabab (KSA)	20:00 - Több, mint 2,5 (Gólszám 2,5)	1.59	4.95
10f8d244-0c46-441d-a27a-4bde75f2fd0c	2025-05-26	Hétfő	Kaszadella csomag	Közepes tipp	4-es kötés	_Kdl_Köz_4_1_5	Elversberg - Heidenheim	20:30 - Több, mint 2,5 (Gólszám 2,5)	1.66	4.95
cb6cf66d-5789-4ac9-95cd-79a6cc9d352f	2025-05-27	Kedd	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Dup_2_1_1	Braunschweig - Saarbrücken	20:30 - Braunschweig (1X2)	1.76	2.09
3c58a517-06e4-42ae-8825-2a7af8f2c9d7	2025-05-27	Kedd	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Dup_2_1_1	JS Saoura - MC Alger	20:00 - Döntetlen vagy MC Alger (Kétesélyes)	1.19	2.09
9aa75dbd-fd2e-4edd-b2e9-17e23747fdb9	2025-05-27	Kedd	Kaszadella csomag	Közepes tipp	3-as kötés	_Kdl_Köz_3_1_2	Daegu - Jeonbuk	12:30 - Több, mint 2,5 (Gólszám 2,5)	1.67	2.74
55849b49-dc2d-468e-81f9-f35e184dfa1b	2025-05-27	Kedd	Kaszadella csomag	Közepes tipp	3-as kötés	_Kdl_Köz_3_1_2	Suwon City - Jeju	12:30 - Suwon City vagy Döntetlen (Kétesélyes)	1.38	2.74
75c61364-7f00-48db-8fd9-7425a7c33548	2025-05-27	Kedd	Kaszadella csomag	Közepes tipp	3-as kötés	_Kdl_Köz_3_1_2	Jamaika - Trindad és Tobago	20:00 - Jamaika vagy Döntetlen (Kétesélyes)	1.19	2.74
d83c3330-d487-46e7-87e7-b4f31405df5f	2025-05-27	Kedd	Kaszadella csomag	Duplázó	1-es kötés	_Kdl_Dup_Egyéni_1_3	Daejeon Citizen - Pohang	12:30 - Daejeon Citizen (1X2)	2.03	2.03
892d9177-ad92-43be-a346-5ac97fdb9616	2025-05-27	Kedd	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Dup_2_1_4	Jaegu - Jeonbuk	12:30 - Több, mint 2,5 (Gólszám 2,5)	1.63	2.00
2938a89f-ce37-4ea4-a485-3fb5dba2d51d	2025-05-27	Kedd	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Dup_2_1_4	Deajeon Citizen - Pohang	12:30 - Több, mint 1,5 (Gólszám 1,5)	1.23	2.00
a605137a-d659-43e4-bc21-5a1c01d2d559	2025-05-27	Kedd	Kaszadella csomag	Közepes tipp	3-as kötés	_Kdl_Köz_3_1_5	Braunschweig - Saarbrücken	20:30 - Több, mint 2,5 (Gólszám 2,5)	1.78	3.37
b733a5aa-2b32-4f76-ad65-f1900a704755	2025-05-27	Kedd	Kaszadella csomag	Közepes tipp	3-as kötés	_Kdl_Köz_3_1_5	Grasshoppers - Aarau	20:30 - Több, mint 2,5 (Gólszám 2,5)	1.58	3.37
ab977a02-6164-4eb9-8931-bfdea46bf6dd	2025-05-27	Kedd	Kaszadella csomag	Közepes tipp	3-as kötés	_Kdl_Köz_3_1_5	Jamaika - Trindad és Tobago	20:00 - Több, mint 1,5 (Gólszám 1,5)	1.20	3.37
bba57826-6a2a-4392-911c-3639c774405f	2025-05-28	Szerda	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Dup_2_1_1	Urawa RD - Cerezo Osaka	12:30 - Több, mint 2,5	1.75	2.31
8271e81b-090d-4d80-905f-70fcd1d15ba0	2025-05-28	Szerda	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Dup_2_1_1	Gwanwji - Ulsan	12:30 - Több, mint 1,5 (Gólszám 1,5)	1.32	2.31
a79f1768-6a4b-41d3-884b-3d04f80e79c2	2025-05-28	Szerda	Kaszadella csomag	Közepes tipp	2-es kötés	_Kdl_Köz_2_1_2	Betis - Chelsea	21:00 - Több, mint 2,5 (Gólszám 2,5)	1.83	3.51
e4e2dae4-9ba8-4ee3-8450-b6638226d0b0	2025-05-28	Szerda	Kaszadella csomag	Közepes tipp	2-es kötés	_Kdl_Köz_2_1_2	Ghána - Nigéria	20:00 - Nigéria (1X2)	1.92	3.51
f6d4429d-a489-43f4-8615-cea2c20627e8	2025-05-28	Szerda	Kaszadella csomag	Duplázó	1-es kötés	_Kdl_Dup_Egyéni_1_3	Bolivar La Paz - Cerro Porteno	(05.29) 02:30 - Igen (Mindkét csapat szerez gólt)	1.97	1.97
388e7da3-4c06-4fa3-a934-82e8cdd44745	2025-05-28	Szerda	Kaszadella csomag	Duplázó	3-as kötés	_Kdl_Dup_3_1_4	Gangwon - Anyang	12:30 - Gangwon (1X2)	1.33	2.20
53d6fc9f-bfb4-42e6-af8a-372004d24e63	2025-05-28	Szerda	Kaszadella csomag	Duplázó	3-as kötés	_Kdl_Dup_3_1_4	Jönköping Södra - Hassleholms IF	19:00 - Jönköping Södra (Döntetlennél a tét visszajár)	1.26	2.20
4054d69e-2149-4015-ac60-cad2d3545e5c	2025-05-28	Szerda	Kaszadella csomag	Duplázó	3-as kötés	_Kdl_Dup_3_1_4	Skövde - Husqvarna	19:00 - Skövde (Döntetlennél a tét visszajár)	1.31	2.20
d118f0d9-8ab1-4eab-93f5-2bc859532ec3	2025-05-28	Szerda	Kaszadella csomag	Közepes tipp	2-es kötés	_Kdl_Köz_2_1_5	Urawa RD - Cerezo Osaka	12:00 - Igen (Mindkét csapat szerez gólt)	1.68	2.94
2d7eb26a-50d4-45e7-8940-455a84dfc7c7	2025-05-28	Szerda	Kaszadella csomag	Közepes tipp	2-es kötés	_Kdl_Köz_2_1_5	Betis - Chelsea	21:00 - Igen (Mindkét csapat szerez gólt)	1.75	2.94
bc44bd64-7977-4cc4-8d61-9a330e037fa4	2025-05-29	Csütörtök	Kaszadella csomag	Duplázó	3-as kötés	_Kdl_Dup_3_1_1	Cremonese - Spezia	20:30 - Cremonese vagy Döntetelen (Kétesélyes)	1.29	2.11
97687864-fe24-40e0-a636-a9e289d79c05	2025-05-29	Csütörtök	Kaszadella csomag	Duplázó	3-as kötés	_Kdl_Dup_3_1_1	LASK - Rapid Wien	17:00 - Lask vagy Döntetlen (Kétesélyes)	1.34	2.11
acc6b945-0a26-43eb-9612-54d6254b5693	2025-05-29	Csütörtök	Kaszadella csomag	Duplázó	3-as kötés	_Kdl_Dup_3_1_1	Brann Bergen - Molde	18:00 - Bran Bergen vagy Döntetlen (Kétesélyes)	1.22	2.11
e0960b53-41ed-4082-a52f-ee2e170e89e7	2025-05-29	Csütörtök	Kaszadella csomag	Közepes tipp	3-as kötés	_Kdl_Köz_3_1_2	FC Köbenhavn - Silkeborg	17:00 - FC Köbenhavn (1X2)	1.46	2.65
a7796abd-42f2-40d1-9574-8e82b70a9f5f	2025-05-29	Csütörtök	Kaszadella csomag	Közepes tipp	3-as kötés	_Kdl_Köz_3_1_2	Fram - KA Akureyi	18:15 - Igen (Mindkét csapat szerez gólt)	1.45	2.65
4e4557bb-3f5f-4050-ba83-ee2ff7469fbc	2025-05-29	Csütörtök	Kaszadella csomag	Közepes tipp	3-as kötés	_Kdl_Köz_3_1_2	Stajrnan - KR	21:15 - Igen (Mindkét csapat szerez gólt)	1.25	2.65
31b58fe3-a488-46c6-bf25-9c5e41a44b41	2025-05-29	Csütörtök	Kaszadella csomag	Duplázó	1-es kötés	_Kdl_Dup_Egyéni_1_3	Breidabilk - ÍA Akranes	18:15 - Hazai és több (1X2 + Gólszám 3,5)	2.19	2.19
cd22ef9b-3f58-424c-8fd2-66e38325f888	2025-05-29	Csütörtök	Kaszadella csomag	Közepes tipp	3-as kötés	_Kdl_Köz_3_1_4	Reims - Mets	20:30 - Igen (Mindkét csapat szerez gólt)/ Több, mint 1,5 (Gólszám 1,5)	1.79	3.02
0a6224bf-c736-47b8-b72f-d627b5776fe1	2025-05-29	Csütörtök	Kaszadella csomag	Közepes tipp	3-as kötés	_Kdl_Köz_3_1_4	Cremonese - Spezia	20:30 - Több, mint 1,5 (Gólszám 1,5)	1.31	3.02
e39abbfd-23e1-4c46-bd14-65c613c2de1d	2025-05-29	Csütörtök	Kaszadella csomag	Közepes tipp	3-as kötés	_Kdl_Köz_3_1_4	United Nordic - Örebro Syrianska	16:00 - United Nordic (1X2)	1.29	3.02
9e71128c-b7a0-45fc-a084-e03944af4f80	2025-05-31	Szombat	Kaszadella csomag	Közepes tipp	2-es kötés	_Kdl_Köz_2_1_1	Toronto FC - Charlotte	(01.06) 1:30 - Igen (Mindkét csapat szerez gólt)	1.49	2.56
5ce72875-8f09-4e42-a866-dbfd0491dc0f	2025-05-31	Szombat	Kaszadella csomag	Közepes tipp	2-es kötés	_Kdl_Köz_2_1_1	Paris SG - Internazionale	21:00  - Igen (Mindkét csapat szerez gólt)	1.72	2.56
fd00f04d-2ab1-40c2-9f3a-b66401f47ad9	2025-05-31	Szombat	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Dup_2_1_2	Melbourne City - Melbourne Victory	11:40 - Több, mint 1,5 (Gólszám 1,5)	1.19	2.03
4087df0e-2727-4bdb-9f48-d26882316274	2025-05-31	Szombat	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Dup_2_1_2	Sanfrecce Hiroshima - Kawasaki Frontale	10:30 - Igen (Mindkét csapat szerez gólt)	1.71	2.03
81adca7f-8d78-45f8-b590-df2198068002	2025-05-31	Szombat	Kaszadella csomag	Nagy tipp	4-es kötés	_Kdl_Nag_4_1_3	Helsinki JK - Kuopio PS	18:00 - Igen (Mindkét csapat szerez gólt)	1.67	5.69
61edbbd7-6771-4544-b079-887e584cd299	2025-05-31	Szombat	Kaszadella csomag	Nagy tipp	4-es kötés	_Kdl_Nag_4_1_3	Sandviken - Varberg	15:00 - Döntetlen vagy Varberg (Kétesélyes)	1.37	5.69
bac03f37-01f9-45fc-b73a-265d047a6095	2025-05-31	Szombat	Kaszadella csomag	Nagy tipp	4-es kötés	_Kdl_Nag_4_1_3	Öregryte - Trelleborg	15:00 - Öregryte (1X2)	1.74	5.69
fd8148bf-6e60-4f54-b1c5-bcdbc6cfc75e	2025-05-31	Szombat	Kaszadella csomag	Nagy tipp	4-es kötés	_Kdl_Nag_4_1_3	Elfsborg - Hammarby	15:00 - Több, mint 2,25 (Ázsiai Gólszám 2,25)	1.43	5.69
b79e749b-9467-43eb-a9ec-51839be8a74c	2025-05-31	Szombat	Kaszadella csomag	Duplázó	3-as kötés	_Kdl_Dup_3_1_4	Pors Grenland - Sotra	13:00 - Döntetlen vagy Sotra (Kétesélyes)	1.20	2.15
7dab045c-d1e6-4f39-9b05-8b8156aef1b9	2025-05-31	Szombat	Kaszadella csomag	Duplázó	3-as kötés	_Kdl_Dup_3_1_4	Ferrol - Sp. Gijon	16:15 - Több, mint 1,5 (Gólszám 1,5)	1.30	2.15
a02f45c0-86f4-4107-a42a-7f2ffb09f62e	2025-05-31	Szombat	Kaszadella csomag	Duplázó	3-as kötés	_Kdl_Dup_3_1_4	Jeonbuk - Ulsan	12:00 - Jeonbuk vagy Döntetlen (Kétesélyes)	1.38	2.15
49e7239f-ab2b-4201-8ab2-7b42678ef822	2025-05-31	Szombat	Kaszadella csomag	Közepes tipp	3-as kötés	_Kdl_Köz_3_1_5	Anyang - Daejeon Citizen	12:00 - Igen (Mindkét csapat szerez gólt)	1.77	2.92
13f5b508-b215-480e-8e1e-92b5d213def6	2025-05-31	Szombat	Kaszadella csomag	Közepes tipp	3-as kötés	_Kdl_Köz_3_1_5	Moss - Start	16:00 - Kevesebb, mint 3,5 (Gólszám 3,5)	1.40	2.92
eb4b3fa8-8d33-4083-9079-f648eddccb2b	2025-05-31	Szombat	Kaszadella csomag	Közepes tipp	3-as kötés	_Kdl_Köz_3_1_5	Bahia BA - Sao Paulo SP	23:30 - Kevesebb, mint 3,5 (Gólszám 3,5)	1.18	2.92
7d581baa-cfba-47d9-944e-f06eafd1398e	2025-06-01	Vasárnap	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Dup_2_1_1	Willem II - Telsar	18:00 - Igen (Mindkét csapat szerez gólt)	1.66	2.06
099046b8-6f61-443d-8442-b9a571656b91	2025-06-01	Vasárnap	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Dup_2_1_1	KaPa - Klubi 05	17:30 - Több, mint 2,5 (Gólszám 2,5)	1.24	2.06
a3e11624-19b0-4e33-8e48-eea6a3b356fb	2025-06-01	Vasárnap	Kaszadella csomag	Duplázó	3-as kötés	_Kdl_Dup_3_1_2	Oldham - Southend	16:00 - Több, mint 1,5 (Gólszám 1,5)	1.32	2.06
912ecb8a-7133-4fff-a965-999c13cddf18	2025-06-01	Vasárnap	Kaszadella csomag	Duplázó	3-as kötés	_Kdl_Dup_3_1_2	Gnistan - Ilves	15:00 - Nem (Vendégcsapat kapott gól nélkül játsza le a mérkőzést)	1.28	2.06
d49c0148-53d1-416e-a2f0-2a909faaf7a4	2025-06-01	Vasárnap	Kaszadella csomag	Duplázó	3-as kötés	_Kdl_Dup_3_1_2	Brommapojkarna - Göteborg	14:00 - Nem (hazai csapat kapott gól nélkül játsza le a mérkőzést)	1.22	2.06
731e6fb1-1774-4058-b07a-92aa650362fe	2025-06-01	Vasárnap	Kaszadella csomag	Közepes tipp	3-as kötés	_Kdl_Köz_3_1_3	Chaarita Juniors - Gimnasia Jujuy	19:30 - Kevesebb, mint 2,5 (Gólszám 2,5)	1.36	3.10
9f516a37-a33a-4916-bcbf-51076bdde3e2	2025-06-01	Vasárnap	Kaszadella csomag	Közepes tipp	3-as kötés	_Kdl_Köz_3_1_3	Talleres de Remiedios - Almirante Brown	20:30 - Kevesbb, mint 2,5 (Gólszám 2,5)	1.33	3.10
74e11220-ce97-4f5b-bea6-5b6a53966c93	2025-06-01	Vasárnap	Kaszadella csomag	Közepes tipp	3-as kötés	_Kdl_Köz_3_1_3	Sirius -AIK Stockholm	16:30 - Döntetlen vagy AIK Stockholm (Kétesélyes)	1.34	3.10
67a4525e-6a10-489b-8b76-6c9e8af2f73d	2025-06-01	Vasárnap	Kaszadella csomag	Közepes tipp	3-as kötés	_Kdl_Köz_3_1_3	Hammarby Talang - Vasalund	16:00 - Hammarby Talang vagy Döntetelen (Kétesélyes)	1.28	3.10
51f9a2dc-7fee-445b-bd8a-7dc51fa5276a	2025-06-01	Vasárnap	Kaszadella csomag	Nagy tipp	5-ös ods	_Kdl_Nag_Egyéni_1_4	Wisla Plock - Miedz Legnica	16:30 -Igen (Mindkét csapat szerez gólt)	1.61	5.06
fc245b0f-3501-4097-97a5-cbde02591b60	2025-06-01	Vasárnap	Kaszadella csomag	Nagy tipp	5-ös ods	_Kdl_Nag_Egyéni_1_4	Mjallby - Varnamo	16:30 - Mjallby (1X2)	1.39	5.06
27c0f77b-8ac1-46de-be50-f3ca6a8e6c6e	2025-06-01	Vasárnap	Kaszadella csomag	Nagy tipp	5-ös ods	_Kdl_Nag_Egyéni_1_4	Rapid Wien - LASK	17:00 - Több, mint 1,5 (Gólszám 1,5)	1.16	5.06
acaa2be6-b5a9-417d-b90a-85aea5b66810	2025-06-01	Vasárnap	Kaszadella csomag	Nagy tipp	5-ös ods	_Kdl_Nag_Egyéni_1_4	Napredak Krusevac - Mladost Novi Sad	20:00 - Kevesebb, mint 2,5 (Gólszám 2,5)	1.61	5.06
71b954c9-ef8e-4052-91a4-9c0be611f5aa	2025-06-01	Vasárnap	Kaszadella csomag	Nagy tipp	5-ös ods	_Kdl_Nag_Egyéni_1_4	Mirassol SP - Sport Recife	16:00 - Mirassol vagy Döntetelen (Kétesélyes)	1.21	5.06
4c692155-b6c9-4b99-865b-a3db239d98c8	2025-06-03	Kedd	Kaszadella csomag	Duplázó	3-as kötés	_Kdl_Dup_3_1_2	Franciaország U20 - Szaúd-Arábia U23	17:30 - Franciaország (1X2)	1.51	2.43
2c933f8c-1a83-4f88-8e0c-27ab07c94f81	2025-06-03	Kedd	Kaszadella csomag	Duplázó	3-as kötés	_Kdl_Dup_3_1_2	Fölüp-szigetek N - Tajvan N	13:00 - Fülöp-szigetek vagy Döntetelen (Kétesélyes)	1.16	2.43
417cd81b-6045-4e2f-b435-f1c0450e8f47	2025-06-03	Kedd	Kaszadella csomag	Duplázó	3-as kötés	_Kdl_Dup_3_1_2	Dél-Afrika N - Zambia N	15:00 - Kevesebb, mint 3,5 (Gólszám 3,5)	1.39	2.43
126ed6e1-d810-4668-9a68-cae0615b0650	2025-06-03	Kedd	Kaszadella csomag	Duplázó	3-as kötés	_Kdl_Dup_3_1_3	E. Svitolina - I. Swiatek	12:30 - I. Swiatek (A mérkőzés győztese)	1.30	2.44
8377aec6-f342-46f2-8160-6007c37e0889	2025-06-03	Kedd	Kaszadella csomag	Duplázó	3-as kötés	_Kdl_Dup_3_1_3	A. Sabalenka - Qinwen Zheng	11:00 - A. Sabalenka (A mérkőzés győztese)	1.32	2.44
5dc07add-1a30-4ed2-a0cb-87e8a10fdfc2	2025-06-03	Kedd	Kaszadella csomag	Duplázó	3-as kötés	_Kdl_Dup_3_1_3	Nimes -Montpellier	20:00 - Montpellier (1X2)	1.42	2.44
428f5249-cd6a-4b12-ab0b-36feda97679b	2025-06-03	Kedd	Kaszadella csomag	Közepes tipp	2-es kötés	_Kdl_Köz_2_1_4	Union Espanola - eportes Limache	21:00 - Igen (mindkét csapat szerez gólt)	1.51	2.55
e2e766e2-898d-4cd3-bbdb-50bdf58eaebf	2025-06-03	Kedd	Kaszadella csomag	Közepes tipp	2-es kötés	_Kdl_Köz_2_1_4	Edmonton - Florida	(?) - Edmonton (A mérkőzés győztese)	1.69	2.55
10b710c6-88cb-4ef2-b750-5500ab6b6d6b	2025-06-03	Kedd	Kaszadella csomag	Közepes tipp	4-es kötés	_Kdl_Köz_4_1_1	Magyarország N - Fehéroroszország N	19:00 - Magyarország (1X2)	1.45	2.63
8e2d1e33-fe95-41bf-b13a-cfb523497022	2025-06-03	Kedd	Kaszadella csomag	Közepes tipp	4-es kötés	_Kdl_Köz_4_1_1	Görögország N - Törökország N	19:00 - Döntetlen vagy Törökország (Kétesélyes)	1.22	2.63
45ce86e3-a213-43f9-81a4-99246357a91c	2025-06-03	Kedd	Kaszadella csomag	Közepes tipp	4-es kötés	_Kdl_Köz_4_1_1	Portugália N - Belgium N	19:00 - Portugália vagy Döntetelen (Kétesélyes)	1.21	2.63
e0a521f1-d71c-436c-b422-4cf0273bc252	2025-06-03	Kedd	Kaszadella csomag	Közepes tipp	4-es kötés	_Kdl_Köz_4_1_1	Mali U20 - Panama U20	14:00 - Mali vagy Döntetlen (Kétesélyes)	1.23	2.63
0d7d41d1-7fe9-4142-a9b2-8571c58155a2	2025-06-06	Péntek	Kaszadella csomag	Duplázó	1-es kötés	_Kdl_Dup_Egyéni_1_1	Magyarország - Svédország	19:30 - Magyarország (1X2)	1.95	1.95
995cab08-b678-47c4-ae6c-7e1eb4bb660a	2025-06-06	Péntek	Kaszadella csomag	Közepes tipp	3-as kötés	_Kdl_Köz_3_1_2	Észak-Macedónia - Belgium	20:45 - Több, mint 2,5 (Gólszám 2,5)	1.72	3.48
7d2f3044-af42-4577-aea5-9f4125a3b6e1	2025-06-06	Péntek	Kaszadella csomag	Közepes tipp	3-as kötés	_Kdl_Köz_3_1_2	Skócia - Izland	20:45 - Több, mint 1,5 (Gólszám 1,5)	1.25	3.48
32f25a20-a6e6-416b-8be9-a272aa67f89f	2025-06-06	Péntek	Kaszadella csomag	Közepes tipp	3-as kötés	_Kdl_Köz_3_1_2	Norvégia - Olaszország	20:45 - Igen (Mindkét csapat szerez gólt	1.62	3.48
63a6fda5-5dd8-418f-9c6f-c1c8124233d7	2025-06-06	Péntek	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Dup_2_1_3	Norvégia - Olaszország	20:45 - Döntetlen vagy Olaszország (Kétesélyes)	1.36	2.34
868aab80-a877-4aa4-a95f-f9f743f2905a	2025-06-06	Péntek	Kaszadella csomag	Duplázó	2-es kötés	_Kdl_Dup_2_1_3	Észak-Macedónia - Belgium	20:5 - Észak-Macedónia (Melyik csapat kap több büntetőlapot?)	1.72	2.34
62556cd0-86c9-40bf-ab64-2f54d3bc63c5	2025-06-06	Péntek	Kaszadella csomag	Közepes tipp	3-as kötés	_Kdl_Köz_3_1_4	Csehország - Montenegró	20:45 - 1-3 (Hazai csapat - Gólszámok)	1.27	3.05
8c3e4f1e-4acf-442f-8075-ee67e2dc0a0c	2025-06-06	Péntek	Kaszadella csomag	Közepes tipp	3-as kötés	_Kdl_Köz_3_1_4	U21 Horvátország - U21 Írország	17:00 - Igen (Mindkét csapat szerez  gólt)	1.68	3.05
bc01765e-e275-47a1-a664-3073be321233	2025-06-06	Péntek	Kaszadella csomag	Közepes tipp	3-as kötés	_Kdl_Köz_3_1_4	Antigua és Barbuda - Kuba	21:00 - Kevesebb, mint 3,5 (Gólszám 3,5)	1.43	3.05
9a105e54-476d-4325-87fa-eb916b9edc6e	2025-07-01	Kedd	Start csomag	Közepes tipp	2-es kötés	_St_Köz_2_1_1	a	b	1.99	1.99
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.users (id, full_name, email, password, status, role, package_id, last_activity_date, created_at, subscription_start, subscription_end) FROM stdin;
900a30c8-bb72-4366-93ba-c13580229878	Szeles Bence	bence.szeles1227@gmail.com	$2b$10$iSqbnzk9Aa4uF89RBzWZDumeBBsjCakeL0xa8.YISURoyP0AQfZ8.	Approved	ADMIN	3	2025-07-07	2025-04-13 17:30:50.563089+00	2025-04-23 18:52:51.468+00	2025-05-23 18:52:51.468+00
378fbe1f-de8d-4ca5-b3c8-2d86ba1d7e00	Sun Ping Tibor	sunpingt@gmail.com	$2b$10$BdexLysZAyr73fRrrGfWC.jlmJF.VN7I4OpdKC7K7XkbCr42K2alC	Approved	ADMIN	3	2025-06-03	2025-04-15 15:15:38.655169+00	2025-05-25 07:36:35.083+00	2025-06-24 07:36:35.083+00
95e41312-c58a-4790-8f33-179396b1cf81	Modroczky Fernec	modroczkyferenc0221@gmail.com	$2b$10$SV4wJSz4Hde8F9QoBKr9DO1D6ckoAjzeE4fOgDm/aefu17GA8HQZi	Approved	ADMIN	3	2025-07-11	2025-03-30 18:58:46.165805+00	2025-04-22 23:06:42.445+00	2025-05-22 23:06:42.445+00
660d0bef-df49-463d-a01f-2bd1ef615c88	Modroczky Ferenc	eyh2pl@stud.uni-obuda.hu	$2b$10$6k1YjTe1gIvivoLpoDB85u0gbcTXGGJk2Nzp4AjUnW40uIEtcE92q	Pending	USER	Default	2025-04-24	2025-04-24 20:12:29.877323+00	\N	\N
2ad1eac1-b797-4e18-b070-66c0ee81a930	Modroczky Ferenc	modroczky.ferenc@hok.uni-obuda.hu	$2b$10$CvAM.eSiG93GnSMuyRcw8.1Hol2azTSwXuTUSnK7Q79LfG5DnYp2S	Pending	USER	Default	2025-04-24	2025-04-24 20:23:18.67167+00	\N	\N
0cbb30f7-0f6c-423d-9f03-4365760dc17b	Fehér Krisztián	kfeher538@gmail.com	$2b$10$Ap14xItO/lE2Tx0FZE5NjeI.dX/JgNjB.uGkiA4S1SWxy/IHLuxJG	Approved	USER	Default	2025-05-18	2025-05-18 17:10:48.923286+00	\N	\N
1df6d5c6-a943-4006-a233-5b637e0f19f6	Varga	edinakulcsar@edinakulcsar.com	$2b$10$tYGTHu54ILAkA8I/JcRmzu7mbpPmxbc27vCXlZGB/pIFsnLIEm33q	Approved	USER	3	2025-06-19	2025-04-15 08:01:15.466805+00	2025-05-24 08:29:23.24+00	2025-06-23 08:29:23.24+00
a2636676-f065-45b6-9dde-738b665dabb9	Nagy	nbeniamk@gmail.com	$2b$10$eMisINHiM9E1omjFa2CHcutPm7nwF2T7VeMA7YEzMKckRDokpoEP2	Approved	USER	3	2025-05-31	2025-05-25 18:53:03.974007+00	2025-05-31 10:13:17.314+00	2025-06-30 10:13:17.314+00
\.


--
-- Data for Name: weeklyTips; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public."weeklyTips" (id, package, day, tip, total_odds) FROM stdin;
2fa29b3e-c885-46b3-82c7-bc6716b69d1b	KASZA	Vasárnap	1	2
\.


--
-- Name: __drizzle_migrations_id_seq; Type: SEQUENCE SET; Schema: drizzle; Owner: neondb_owner
--

SELECT pg_catalog.setval('drizzle.__drizzle_migrations_id_seq', 2, true);


--
-- Name: __drizzle_migrations __drizzle_migrations_pkey; Type: CONSTRAINT; Schema: drizzle; Owner: neondb_owner
--

ALTER TABLE ONLY drizzle.__drizzle_migrations
    ADD CONSTRAINT __drizzle_migrations_pkey PRIMARY KEY (id);


--
-- Name: forgot_password_tokens forgot_password_tokens_id_unique; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.forgot_password_tokens
    ADD CONSTRAINT forgot_password_tokens_id_unique PRIMARY KEY (id);


--
-- Name: rate_limits rate_limits_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.rate_limits
    ADD CONSTRAINT rate_limits_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: temp_cache temp_cache_key_unique; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.temp_cache
    ADD CONSTRAINT temp_cache_key_unique UNIQUE (key);


--
-- Name: temp_cache temp_cache_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.temp_cache
    ADD CONSTRAINT temp_cache_pkey PRIMARY KEY (id);


--
-- Name: ticket_tips ticket_tips_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.ticket_tips
    ADD CONSTRAINT ticket_tips_pkey PRIMARY KEY (id);


--
-- Name: users users_email_unique; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_unique UNIQUE (email);


--
-- Name: users users_id_unique; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_id_unique PRIMARY KEY (id);


--
-- Name: weeklyTips weeklyTips_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."weeklyTips"
    ADD CONSTRAINT "weeklyTips_pkey" PRIMARY KEY (id);


--
-- Name: sessions sessions_user_id_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_user_id_users_id_fk FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO neon_superuser WITH GRANT OPTION;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON TABLES TO neon_superuser WITH GRANT OPTION;


--
-- PostgreSQL database dump complete
--

