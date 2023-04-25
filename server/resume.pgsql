-- SWITCH USER

SET ROLE dev;

-- SWITCH TO DATABASE

\c myresumebuilder;

-- CREATE resume TABLE
CREATE TABLE resumes (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    cv_no SERIAL NOT NULL,
    user_id uuid NOT NULL,
    cv_title VARCHAR(100) NOT NULL,
    personal JSONB NOT NULL,
    experience JSONB NOT NULL,
    education JSONB NOT NULL,
    others JSONB NOT NULL,
    preview_img VARCHAR(255) NOT NULL,
    pdf VARCHAR(255) NOT NULL,
    created_at DATE NOT NULL DEFAULT CURRENT_DATE,
    updated_at DATE NOT NULL DEFAULT CURRENT_DATE,
    CONSTRAINT fk_user_id
    FOREIGN KEY(user_id)
    REFERENCES uuser(user_id)
    ON DELETE CASCADE
);

CREATE OR REPLACE FUNCTION set_cv_no()
RETURNS TRIGGER AS $$
BEGIN
    NEW.cv_no = (SELECT COALESCE(MAX(cv_no), 0) + 1 FROM resumes WHERE user_id = NEW.user_id);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_DATE;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_cv_no
BEFORE INSERT ON resumes
FOR EACH ROW
    EXECUTE FUNCTION set_cv_no();

CREATE TRIGGER update_updated_at
BEFORE UPDATE ON resumes
FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();

