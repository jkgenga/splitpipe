create table LEAGUE (LEAGUE_ID bigint not null, SHORTCUT varchar(255) not null, SEASON_ID bigint, primary key (LEAGUE_ID));
create table LEAGUE_RESULT (LEAGUE_RESULT_ID bigint not null, DRAWS integer, GAMES integer, GOALS integer, GOALS_GOT integer, LOOSES integer, POINTS integer, TEAM_ID bigint, WINS integer, LEAGUE_ID bigint not null, primary key (LEAGUE_RESULT_ID));
create table MATCH_DAYS (MATCH_DAY_ID bigint not null, MATCH_DAY_NUMBER integer, SEASON_ID bigint not null, primary key (MATCH_DAY_ID));
create table MATCHES (MATCH_ID bigint not null, MATCH_DATE date, GOALS_GUEST integer, GOALS_HOME integer, RESULT varchar(255), TINGLER time, MATCH_DAY bigint, TEAM_GUEST_ID bigint, TEAM_HOME_ID bigint, primary key (MATCH_ID));
create table QUOTES (QUOTE_ID bigint not null, QUOTE_DRAW integer, QUOTE_GUEST_WIN integer, QUOTE_HOME_WIN integer, MATCH_ID bigint, primary key (QUOTE_ID));
create table ROASTER (ROASTER_ID bigint not null, GAIN double precision, INPUT double precision, MATCH_DAY_FINISHED bit, POINTS integer, POINTS_TOTAL integer, RANK integer, RANK_ON_MATCH_DAY integer, MATCHDAY_ID bigint, SEASON_ID bigint, USER_ID bigint, primary key (ROASTER_ID));
create table SEASONS (SEASON_ID bigint not null, ACTUAL_GAME_DAY integer not null, BEGIN_YEAR integer not null, SHORTCUT varchar(255) not null, primary key (SEASON_ID));
create table TEAMS (TEAM_ID bigint not null, LOGO_URL varchar(255), TEAM_NAME varchar(255) not null, primary key (TEAM_ID));
create table TIPS (TIP_ID bigint not null, TIP varchar(255), MATCH_ID bigint, USER_ID bigint, primary key (TIP_ID));
create table USER_APPLICATION_ROLE (USER_ID bigint not null, ROLE_ID bigint not null);
create table USER_ROLES (ROLE_ID bigint not null, DESCRIPTION varchar(255), ROLE_NAME varchar(255) not null, primary key (ROLE_ID));
create table USERS (USER_ID bigint not null, GIVEN_NAME varchar(255), SECRET varchar(255), SURNAME varchar(255), USER_NAME varchar(255) not null, primary key (USER_ID));
alter table LEAGUE add constraint UKo2kbx7nomatkf3rtebmask919 unique (SHORTCUT, SEASON_ID);
alter table LEAGUE_RESULT add constraint UKtix4ji3dhts5le1x187fb9kas unique (LEAGUE_ID, TEAM_ID);
alter table MATCH_DAYS add constraint UK8m0189k0xtbjpg31kht81wq75 unique (SEASON_ID, MATCH_DAY_NUMBER);
alter table MATCHES add constraint UKf5jwcqodlixi5va89p2fkb1pg unique (MATCH_DATE, TEAM_HOME_ID, TEAM_GUEST_ID);
alter table QUOTES add constraint UKbfjjjhnu2deea2v2jvang4xt2 unique (MATCH_ID);
alter table ROASTER add constraint UKnhxbupcbp75gc0aqoa2a2ache unique (SEASON_ID, MATCHDAY_ID, USER_ID);
alter table SEASONS add constraint UKtesh1arcw6o51x628x1r6kowb unique (BEGIN_YEAR);
alter table TEAMS add constraint UK_nfptg78ovxf0qutmauyslkm9r unique (LOGO_URL);
alter table TEAMS add constraint UK_qxp7gar5hgjcyoso3riuucnae unique (TEAM_NAME);
alter table TIPS add constraint UKsm8gpxismn72b9exgx3xg3771 unique (USER_ID, MATCH_ID);
alter table LEAGUE add constraint FKmeyxqsror9sel3onr0b0580am foreign key (SEASON_ID) references SEASONS (SEASON_ID);
alter table LEAGUE_RESULT add constraint FKokbqhpbo7ua536257k31aqtkm foreign key (LEAGUE_ID) references LEAGUE (LEAGUE_ID);
alter table MATCH_DAYS add constraint FKd4hju471sge0n8c92i41b0rr4 foreign key (SEASON_ID) references SEASONS (SEASON_ID);
alter table MATCHES add constraint FKm3u1mtunhrgy0kr6m9qc06rh8 foreign key (MATCH_DAY_ID) references MATCH_DAYS (MATCH_DAY_ID);
alter table MATCHES add constraint FKiqi4x3l1apm2dxkl61u5suf4b foreign key (TEAM_GUEST_ID) references TEAMS (TEAM_ID);
alter table MATCHES add constraint FK2js4a0dkemh873vebsmvr4cfc foreign key (TEAM_HOME_ID) references TEAMS (TEAM_ID);
alter table QUOTES add constraint FKpxaivhgkda4shf9otsme5sai0 foreign key (MATCH_ID) references MATCHES (MATCH_ID);
alter table ROASTER add constraint FK6m6alrhpnrrv46fu5lybilodr foreign key (MATCHDAY_ID) references MATCH_DAYS (MATCH_DAY_ID);
alter table ROASTER add constraint FKpjdjr7wjd9c2sh59mdgavxkpe foreign key (SEASON_ID) references SEASONS (SEASON_ID);
alter table ROASTER add constraint FK92888xdfkfhrih6jrn8xr36ga foreign key (USER_ID) references USERS (USER_ID);
alter table TIPS add constraint FKabjvhb39gll5l8v9yncv1rdpy foreign key (MATCH_ID) references MATCHES (MATCH_ID);
alter table TIPS add constraint FKhcsptch45drd398wrbv3xnaty foreign key (USER_ID) references USERS (USER_ID);
alter table USER_APPLICATION_ROLE add constraint FKcev5npt4ybxka2rm2t9yflocl foreign key (ROLE_ID) references USER_ROLES (ROLE_ID);
alter table USER_APPLICATION_ROLE add constraint FKeda9ofyncoswe2en5alpep8ax foreign key (USER_ID) references USERS (USER_ID);
