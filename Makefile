install: remove-venv-directory create-venv-directory install-dev-requirements pre-commit-install create-database

remove-venv-directory:
	@printf "Removing venv directory... "
	@rm -rf venv
	@echo "removed!"

create-venv-directory:
	@printf "Creating venv directory... "
	@python3 -m venv venv
	@echo "created!"

install-dev-requirements:
	@printf "Installing dev requirements... "
	@pip install -r requirements/dev.txt
	@echo "installed!"

pre-commit-install:
	@printf "Executing pre-commit install... "
	@pre-commit install
	@echo "executed!"

create-database:
	@printf "Executing alembic..."
	@alembic upgrade head
	@echo "executed!"
