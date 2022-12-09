import { MigrationInterface, QueryRunner } from 'typeorm';

export class Initial1669291250261 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS tasks;`);
    await queryRunner.query(`DROP TABLE IF EXISTS task_statuses;`);
    await queryRunner.query(`DROP TABLE IF EXISTS download_resources;`);
    await queryRunner.query(`
      CREATE TABLE public.tasks
        (
          id serial,
          imdb_id serial,
          download_resource_id smallserial DEFAULT 1,
          started bigserial,
          finished bigserial,
          path character varying(300),
          url character varying(400),
          downloaded bigserial DEFAULT 0,
          size bigserial DEFAULT 0,
          task_status_id smallserial DEFAULT 1,
          PRIMARY KEY (id)
        );
    `);

    await queryRunner.query(`
      CREATE TABLE public.task_statuses
        (
          id smallserial,
          name character varying(50),
          PRIMARY KEY (id)
        );
    `);

    await queryRunner.query(`
      CREATE TABLE public.show_types
        (
          id smallserial,
          name character varying(50),
          PRIMARY KEY (id)
        );
    `);

    await queryRunner.query(`
      CREATE TABLE public.download_resources
        (
          id smallserial,
          name character varying(50),
          PRIMARY KEY (id)
        );
    `);

    await queryRunner.query(`
      CREATE TABLE public.shows
        (
          id serial,
          imdb_id bigserial,
          title character varying(255),
          type_id smallserial,
          year smallserial,
          popularity smallserial,
          popularity_incline smallint DEFAULT 0,
          rating_imdb smallserial,
          voted_imdb serial,
          PRIMARY KEY (id)
        );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS tasks;`);
    await queryRunner.query(`DROP TABLE IF EXISTS task_statuses;`);
    await queryRunner.query(`DROP TABLE IF EXISTS download_resources;`);
  }
}
