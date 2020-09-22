CREATE TABLE public.crop
(
  id SERIAL PRIMARY KEY,
  description character varying(50) NOT NULL,
  scientific_name character varying(100),
  CONSTRAINT crops_pkey PRIMARY KEY (id)
);

INSERT INTO crop (id, description, scientific_name)
VALUES (nextval('seq_crop_id'),'Milho', 'Milho');

-- [{"id":1,"description":"SOJA","scientific_name":null},{"id":2,"description":"TRIGO","scientific_name":null}]