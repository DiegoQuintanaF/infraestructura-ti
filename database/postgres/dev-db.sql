INSERT INTO auditoriums (total_seats)
VALUES (30), (35), (35);

INSERT INTO auditorium_seats (seat_number, seat_row, auditorium_id)
VALUES (1, 'A', 1), (2, 'A', 1), (3, 'A', 1), (4, 'A', 1), (5, 'A', 1),
       (6, 'B', 1), (7, 'B', 1), (8, 'B', 1), (9, 'B', 1), (10, 'B', 1),
       (11, 'C', 1), (12, 'C', 1), (13, 'C', 1), (14, 'C', 1), (15, 'C', 1),
       (16, 'D', 1), (17, 'D', 1), (18, 'D', 1), (19, 'D', 1), (20, 'D', 1),
       (21, 'E', 1), (22, 'E', 1), (23, 'E', 1), (24, 'E', 1), (25, 'E', 1),
       (26, 'F', 1), (27, 'F', 1), (28, 'F', 1), (29, 'F', 1), (30, 'F', 1);

INSERT INTO auditorium_seats (seat_number, seat_row, auditorium_id)
VALUES (1, 'A', 2), (2, 'A', 2), (3, 'A', 2), (4, 'A', 2), (5, 'A', 2),
       (6, 'B', 2), (7, 'B', 2), (8, 'B', 2), (9, 'B', 2), (10, 'B', 2),
       (11, 'C', 2), (12, 'C', 2), (13, 'C', 2), (14, 'C', 2), (15, 'C', 2),
       (16, 'D', 2), (17, 'D', 2), (18, 'D', 2), (19, 'D', 2), (20, 'D', 2),
       (21, 'E', 2), (22, 'E', 2), (23, 'E', 2), (24, 'E', 2), (25, 'E', 2),
       (26, 'F', 2), (27, 'F', 2), (28, 'F', 2), (29, 'F', 2), (30, 'F', 2),
       (31, 'G', 2), (32, 'G', 2), (33, 'G', 2), (34, 'G', 2), (35, 'G', 2);

INSERT INTO auditorium_seats (seat_number, seat_row, auditorium_id)
VALUES (1, 'A', 3), (2, 'A', 3), (3, 'A', 3), (4, 'A', 3), (5, 'A', 3),
       (6, 'B', 3), (7, 'B', 3), (8, 'B', 3), (9, 'B', 3), (10, 'B', 3),
       (11, 'C', 3), (12, 'C', 3), (13, 'C', 3), (14, 'C', 3), (15, 'C', 3),
       (16, 'D', 3), (17, 'D', 3), (18, 'D', 3), (19, 'D', 3), (20, 'D', 3),
       (21, 'E', 3), (22, 'E', 3), (23, 'E', 3), (24, 'E', 3), (25, 'E', 3),
       (26, 'F', 3), (27, 'F', 3), (28, 'F', 3), (29, 'F', 3), (30, 'F', 3),
       (31, 'G', 3), (32, 'G', 3), (33, 'G', 3), (34, 'G', 3), (35, 'G', 3);

INSERT INTO movies (movie_id, title, description, release_date, rating, poster_path, backdrop_path)
VALUES (
  934765,
  'Rebel Moon (Parte Dos): La Guerrera Que Deja Marcas',
  'Los rebeldes se preparan para luchar contra las implacables fuerzas del Mundomadre mientras se forjan vínculos inquebrantables, surgen nuevos héroes y nacen las leyendas.',
  '2024-04-19',
  6.12,
  '/6HLBxS3bPVCTRsWiy17BYvZUcb9.jpg',
  '/tCo96jmjKEMoWa5eCZNNss3MtMH.jpg'
), (
  1011985,
  'Kung Fu Panda 4',
  'Po se prepara para ser el líder espiritual del Valle de la Paz, buscando un sucesor como Guerrero Dragón. Mientras entrena a un nuevo practicante de kung fu, enfrenta al villano llamado \"el Camaleón\", que evoca villanos del pasado, desafiando todo lo que Po y sus amigos han aprendido.',
  '2024-03-02',
  7.106,
  '/fbgmC0eQJ8KNRwBrjMJgtG9POdn.jpg',
  '/uDosHOFFWtF5YteBRygHALFqLw2.jpg'
), (
  823464,
  'Godzilla y Kong: El nuevo imperio',
  'Una aventura cinematográfica completamente nueva, que enfrentará al todopoderoso Kong y al temible Godzilla contra una colosal amenaza desconocida escondida dentro de nuestro mundo. La nueva y épica película profundizará en las historias de estos titanes, sus orígenes y los misterios de Isla Calavera y más allá, mientras descubre la batalla mítica que ayudó a forjar a estos seres extraordinarios y los unió a la humanidad para siempre.',
  '2024-03-27',
  6.478,
  '/lhyEUeOihbKf7ll8RCIE5CHTie3.jpg',
  '/gj69o3n6cwehZGdinX61eWMIBgI.jpg'
);

INSERT INTO shows (date, start_hour, auditorium_id, movie_id)
VALUES
  ('2024-05-12', '13:20:00', 1, 1011985),
  ('2024-05-12', '09:30:00', 2, 823464),
  ('2024-05-12', '09:30:00', 3, 653346),
  ('2024-05-12', '14:30:00', 2, 934765);