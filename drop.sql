alter table LEAGUE drop foreign key FKmeyxqsror9sel3onr0b0580am
alter table LEAGUE_RESULT drop foreign key FKokbqhpbo7ua536257k31aqtkm
alter table MATCH_DAYS drop foreign key FKd4hju471sge0n8c92i41b0rr4
alter table MATCHES drop foreign key FKm3u1mtunhrgy0kr6m9qc06rh8
alter table MATCHES drop foreign key FKiqi4x3l1apm2dxkl61u5suf4b
alter table MATCHES drop foreign key FK2js4a0dkemh873vebsmvr4cfc
alter table QUOTES drop foreign key FKpxaivhgkda4shf9otsme5sai0
alter table ROASTER drop foreign key FK6m6alrhpnrrv46fu5lybilodr
alter table ROASTER drop foreign key FKpjdjr7wjd9c2sh59mdgavxkpe
alter table ROASTER drop foreign key FK92888xdfkfhrih6jrn8xr36ga
alter table TIPS drop foreign key FKabjvhb39gll5l8v9yncv1rdpy
alter table TIPS drop foreign key FKhcsptch45drd398wrbv3xnaty
alter table USER_APPLICATION_ROLE drop foreign key FKcev5npt4ybxka2rm2t9yflocl
alter table USER_APPLICATION_ROLE drop foreign key FKeda9ofyncoswe2en5alpep8ax
drop table if exists hibernate_sequence
drop table if exists LEAGUE
drop table if exists LEAGUE_RESULT
drop table if exists MATCH_DAYS
drop table if exists MATCHES
drop table if exists QUOTES
drop table if exists ROASTER
drop table if exists SEASONS
drop table if exists TEAMS
drop table if exists TIPS
drop table if exists USER_APPLICATION_ROLE
drop table if exists USER_ROLES
drop table if exists USERS
