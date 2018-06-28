create table user(
	userId int not null auto_increment primary key,
	account varchar(20) not null ,
	passwd varchar(20) not null ,
	nicName varchar(22) not null ,
	headerImg varchar(50) null,
	sex int(1) null,
	phone char(11) null ,
	birthday int null,
	updateTime bigint not null,
	createTime bigint not null,
	bookMoney double not null default 0 ,
	bookBean double not null default 0,
	lv int not null default 1,
	identity int not null default 1,
	state int not null default 0
);

create table book(
	bookId int not null auto_increment primary key,
	bookName varchar(40) not null ,
	bookImg varchar(50) not null,
	introduce text null,
	bookCopyright varchar(50) not null,
	click int not null default 0,
	auhorId int not null , 
	createTime bigint not null ,
	state int not null default 0
);

create table article(
	articleId int not null auto_increment primary key,
	articleTitle varchar(100) null ,
	articleContent text not null,
	articleIndex int not null default 1,
	createTime bigint not null ,
	bookId int not null ,
	state int not null 
);

create table author(
	authorId int not null auto_increment primary key,
	authorName varchar(40) not null,
	state int not null
);

create table b_type(
	bTypeId int not null auto_increment primary key,
	tyoeName varchar(20) not null ,
	fTypeId int null,
	createTime bigint not null ,
	lv int not null default 1,
	state int not null
);

create table book_type(
	btId int not null auto_increment primary key,
	bookId int not null ,
	bTypeId int not null 
);

create table b_comment(
	commontId int not null auto_increment primary key,
	bookId int not null ,
	userId int not null ,
	commentContent text not null ,
	fCommontId int null , 
	createTime bigint not null , 
	state int not null 
);


create table comment_record(
	cRecordId int not null auto_increment primary key,
	userId int not null ,
	commentId int not null ,
	recordType int not null 
);


create table book_shelf_records(
	bsRecordsId int not null auto_increment primary key,
	userId int not null ,
	bookId int not null ,
	createTime bigint not null,
	state int not null default 0
);

create table red_book_records(
	rbRecordsId int not null auto_increment primary key,
	bookId int not null ,
	articleId int not null ,
	updateTime bigint not null,
	createTime bigint not null,
	state int not null default 0
);

create table vip(
	vipId int not null auto_increment primary key,
	userId int not null ,
	experience int not null ,
	lv int not null ,
	endTime bigint not null ,
	updateTime bigint not null,
	createTime bigint not null,
	state int not null default 1
);

create table recharge_records(
	rechargeId int not null auto_increment primary key,
	userId int not null ,
	money double not null,
	type int not null ,
	rDescribe varchar(100) null ,
	createTime bigint not null,
	state int not null 
);

create table sms_records(
	smsId int not null auto_increment primary key,
	phone char(11) not null ,
	smsCode int(6) not null ,
	type int not null default 1,
	createTime bigint 
);

create table user_power(
	upId int not null auto_increment primary key,
	userId int not null ,
	piId int not null ,
	power text not null ,
	createTime bigint not null,
	updataTime bigint not null
);

create table power_identity(
	piId int not null auto_increment primary key,
	piName int not null ,
	power text not null ,
	createTime bigint not null,
	updataTime bigint not null
);