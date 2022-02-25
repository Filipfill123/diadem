Instalace v cloudovém prostředí stratus.zcu.cz
Instalace DEB balíčků Python 3.7
sudo apt-get install -t buster python3.7 python3-virtualenv

Vytvoření Python 3.7 virtualenv a jeho instalace
cd diadem
python3 -m virtualenv -p python3 site
. site/bin/activate
pip install tornado PyEventEmitter

Spuštění:
python3 AdDialog.py
