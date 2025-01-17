PGDMP     %    0                y           my_news    13.2    13.2     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    34298    my_news    DATABASE     k   CREATE DATABASE my_news WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'English_United States.1252';
    DROP DATABASE my_news;
                postgres    false            �            1259    34310    articles    TABLE     n  CREATE TABLE public.articles (
    id integer NOT NULL,
    username character varying(25) NOT NULL,
    source text NOT NULL,
    date character varying(75) NOT NULL,
    author character varying(75) NOT NULL,
    title character varying(250) NOT NULL,
    description text NOT NULL,
    url text NOT NULL,
    image_url text NOT NULL,
    content text NOT NULL
);
    DROP TABLE public.articles;
       public         heap    postgres    false            �            1259    34308    articles_id_seq    SEQUENCE     �   CREATE SEQUENCE public.articles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.articles_id_seq;
       public          postgres    false    202            �           0    0    articles_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.articles_id_seq OWNED BY public.articles.id;
          public          postgres    false    201            �            1259    34299    users    TABLE     �   CREATE TABLE public.users (
    username character varying(25) NOT NULL,
    password text NOT NULL,
    email text NOT NULL,
    CONSTRAINT users_email_check CHECK (("position"(email, '@'::text) > 1))
);
    DROP TABLE public.users;
       public         heap    postgres    false            )           2604    34313    articles id    DEFAULT     j   ALTER TABLE ONLY public.articles ALTER COLUMN id SET DEFAULT nextval('public.articles_id_seq'::regclass);
 :   ALTER TABLE public.articles ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    202    201    202            �          0    34310    articles 
   TABLE DATA           s   COPY public.articles (id, username, source, date, author, title, description, url, image_url, content) FROM stdin;
    public          postgres    false    202   �       �          0    34299    users 
   TABLE DATA           :   COPY public.users (username, password, email) FROM stdin;
    public          postgres    false    200          �           0    0    articles_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.articles_id_seq', 131, true);
          public          postgres    false    201            -           2606    34318    articles articles_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.articles
    ADD CONSTRAINT articles_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.articles DROP CONSTRAINT articles_pkey;
       public            postgres    false    202            +           2606    34307    users users_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (username);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    200            .           2606    34319    articles articles_username_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.articles
    ADD CONSTRAINT articles_username_fkey FOREIGN KEY (username) REFERENCES public.users(username) ON DELETE CASCADE;
 I   ALTER TABLE ONLY public.articles DROP CONSTRAINT articles_username_fkey;
       public          postgres    false    2859    200    202            �   t  x�mT�n�6=+_1�%��)Y��KQg�@�)��ضJI\K�@R��֯��K:��	�b�h�y�M�Z�G�yp���~0ֻ �`<cQ|�6ɶB|	v�Z�����~������������/�?��zF�xr0��Hev��`Nhi(8/����-����T�{��Ϫ4}ph�nZc�2wo��z���U��#��"� D�<��8�}��n���iU�]��!^��_�pb��&�q�\h2o�ÒuĒM5�Qa�&"��dK6�d���X�S��
jAӎ�Mч^�36�p%�YEa�N�JԂm�H�u��,�J�x�B�\b-Cߎ}���Bq�-͒0��J�(K�B��i���c^��܄�g�+f	��~egϬ!�W_�&x��;��"��`�Z�Jv���ҳ8��Xze4ȓ<CmM?�_�A�j.���8�S3kF2=*]���3��{G��΋��n����4�<(�EAu�HW��kU=����2�����?
��P�Һ�n6��ϦS$�yηI�%�MRط�-���֒bJ�N:<�Gc+|:O-�P�|�Z�MK4�	�j�
�u��oA���Гr�G� ���������)�>�4$�БT~����%�܅Ӳ��_���4Bc�,)	뻄s�j �
3.Eڜ�~,��{3R*?њEr7g��|�&@�e?�G�\M���BX1/��e+VL���{��)N�B��4�^�����H)�M��$���I!���2��y��
� 6Q�7"Z�Q'�w�����}��l4�S�𿣍vH��Hgأ���I�"�~o��֌o��w:A�����)��u��8!���N��&�~�+�����C�hL�w���_��eɋw�\�����K��      �   �  x�m��r�@ ��>����*� B͆�EhiA�}����Ies�_�UW�u��񊃫�9;n�m�K��OC�������^k�~�]��ve˯�Lq�oEUHn���,>դ�(��!5�!�XU����r�=��F�"�|���mb�9T���V��n�.'��G�;�������d�X2��z���ٱ\�i���S�8�
�EG�ׄ'`�d^pt�78��T����	��D��	/�����hˠ��WPM,��˟ffh�>n�m�ģ%raIH�$�'�J�f��/�R�c;Q9N���#�q:\�0�(B�|D��=@��:cG}���פ��wXv���6�Є�(�ݵ�_���qYV��$�x�.k g5�����g����r����B     