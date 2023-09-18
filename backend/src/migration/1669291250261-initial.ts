import { MigrationInterface, QueryRunner } from 'typeorm';

export class Initial1669291250261 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS tasks;`);
    await queryRunner.query(`DROP TABLE IF EXISTS task_statuses;`);
    await queryRunner.query(`DROP TABLE IF EXISTS download_resources;`);
    await queryRunner.query(`DROP TABLE IF EXISTS show_types;`);
    await queryRunner.query(`DROP TABLE IF EXISTS episodes;`);
    await queryRunner.query(`DROP TABLE IF EXISTS shows;`);
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS tasks
        (
            id bigint NOT NULL,
            started bigint,
            finished bigint,
            path character varying(300),
            url character varying(400),
            downloaded bigint DEFAULT 0,
            size bigint DEFAULT 0,
            task_status_id smallint NOT NULL DEFAULT 1,
            download_resource_id smallint NOT NULL DEFAULT 1,
            error character varying(100),
            error_time bigint,
            CONSTRAINT tasks_pkey PRIMARY KEY (id)
        )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS task_statuses
        (
            id smallint NOT NULL,
            name character varying(50),
            CONSTRAINT task_statuses_pkey PRIMARY KEY (id)
        )
    `);
    await queryRunner.query(`
      INSERT INTO task_statuses (id, name) VALUES (1, 'IDLE');
    `);
    await queryRunner.query(`
      INSERT INTO task_statuses (id, name) VALUES (2, 'IN_PROGRESS');
    `);
    await queryRunner.query(`
      INSERT INTO task_statuses (id, name) VALUES (3, 'READY');
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS show_types
        (
            id smallint NOT NULL DEFAULT 1,
            name character varying(50),
            CONSTRAINT show_types_pkey PRIMARY KEY (id)
        )
    `);
    await queryRunner.query(`
      INSERT INTO show_types (id, name) VALUES (1, 'TVSHOW');
    `);
    await queryRunner.query(`
      INSERT INTO show_types (id, name) VALUES (2, 'MOVIE');
    `);

    await queryRunner.query(`
      CREATE TABLE download_resources
        (
          id smallserial,
          name character varying(50),
          PRIMARY KEY (id)
        );
    `);
    await queryRunner.query(`
      INSERT INTO download_resources (id, name) VALUES (1, 'ORORO');
    `);
    await queryRunner.query(`
      INSERT INTO download_resources (id, name) VALUES (2, 'ANIME_CULT');
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS episodes
        (
            id bigint NOT NULL DEFAULT 0,
            show_id bigint NOT NULL DEFAULT 0,
            imdb character varying(30),
            episode smallint NOT NULL DEFAULT 0,
            season smallint NOT NULL DEFAULT 0,
            release bigint NOT NULL DEFAULT 0,
            title character varying(300),
            CONSTRAINT episodes_pkey PRIMARY KEY (id)
        )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS shows
        (
            id bigint NOT NULL,
            title character varying(255),
            type_id smallint DEFAULT 1,
            year smallint DEFAULT 0,
            popularity smallint DEFAULT 0,
            popularity_incline smallint DEFAULT 0,
            rating_imdb real DEFAULT 0,
            voted_imdb integer DEFAULT 0,
            image character varying(500),
            description text,
            imdb character varying(30),
            sync bigint NOT NULL DEFAULT 0,
            CONSTRAINT shows_pkey PRIMARY KEY (id)
        )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS tasks;`);
    await queryRunner.query(`DROP TABLE IF EXISTS task_statuses;`);
    await queryRunner.query(`DROP TABLE IF EXISTS download_resources;`);
    await queryRunner.query(`DROP TABLE IF EXISTS show_types;`);
    await queryRunner.query(`DROP TABLE IF EXISTS episodes;`);
    await queryRunner.query(`DROP TABLE IF EXISTS shows;`);
  }
}
