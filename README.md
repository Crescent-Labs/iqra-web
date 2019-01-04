# Iqra website

Iqra is a tool meant to allow Muslims to search the Quran using speech recognition. This repo contains the code for the [website](https://iqraapp.com). There are also repos for the [Android client](https://github.com/Crescent-Labs/iqra-android) and [iOS client](https://github.com/Crescent-Labs/iqra-ios).

### Setup

The website's back-end is a [Flask](http://flask.pocoo.org/) server, and the front-end is [React](https://facebook.github.io/react/) combined with [Redux](http://redux.js.org/). To run the project locally, first clone/download this repo and then navigate into the root of the directory. Then, you'll need to install the Python and JavaScript dependencies:

```
pip install -r requirements.txt
npm install
```

The next step is to duplicate the `default_config.py` file and name the copy `config.py`.

You can now run this project locally. Open two tabs in your terminal. In the first tab, run

```
python app.py
```

and in the second tab run

```
npm run dev
```

You can now visit the website at [http://127.0.0.1:3000/](http://127.0.0.1:3000/).

To test the website's search-related functionality, you will need to clone [the Iqra API server](https://github.com/Crescent-Labs/iqra-api) and then run it simultaneously.

### Code style

Code style is enforced in this project for all code written in Python, JavaScript, and Sass.

To lint your Python code, install [flake8](https://pypi.python.org/pypi/flake8) and then run `flake8` in the root directory.

To lint your JavaScript and Sass, run `npm run lint`. To only lint your JavaScript, run `npm run eslint`, and to only lint your Sass, run `npm run sasslint`.

### Contributing

Contributions of patches and comments are welcome. If you'd like to contribute a new feature, create an issue for it first and only open a pull request once the feature request has been approved by [the project owner](https://github.com/mmmoussa).

Before committing, make sure you have linted the code. There is a pre-commit hook in place to prevent committing code with JavaScript or Sass lint errors.

