create table if not exists `users` (
  `id` int(11) not null AUTO_INCREMENT,
  `email` varchar(100) not null,
  `username` varchar(50) not null,
  `password` varchar(255) not null,
  `token` varchar(64),
  `is_deleted` tinyint(1) default null,
  `created_at` timestamp not null default CURRENT_TIMESTAMP,
  `updated_at` timestamp not null default CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  primary key (`id`)
) OldEngine=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;

create table if not exists `password_tokens` (
  `id` int(11) not null AUTO_INCREMENT,
  `selector` varchar(64) not null,
  `verifier` varchar(64) not null,
  `user_id` int(11) not null,
  `is_deleted` tinyint(1) default null,
  `created_at` timestamp not null default CURRENT_TIMESTAMP,
  primary key (`id`),
  foreign key (`user_id`) references `users` (`id`)
) OldEngine=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;

create table if not exists `auth_tokens` (
  `id` int(11) not null AUTO_INCREMENT,
  `user_id` int(11) not null,
  `selector` varchar(64),
  `verifier` varchar(64),
  `is_deleted` tinyint(1) default null,
  `created_at` timestamp not null default CURRENT_TIMESTAMP,
  primary key (`id`),
  foreign key (`user_id`) references `users` (`id`)
) OldEngine=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;

ALTER TABLE users ADD UNIQUE `user_email_uniq` (`email`);
ALTER TABLE users ADD UNIQUE `user_username_uniq` (`username`);
