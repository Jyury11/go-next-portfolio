CREATE USER 'portfolio'@'%' IDENTIFIED BY 'portfolio';
GRANT SELECT,INSERT,UPDATE,DELETE ON portfolio.* TO 'portfolio'@'%' WITH GRANT OPTION;
