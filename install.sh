echo "creating new folders"
mkdir data
mkdir public/profiles
echo "fetching latest toflit18 data"
curl -o toflit18_bdd.zip "https://raw.githubusercontent.com/medialab/toflit18_data/master/base/bdd%20courante.csv.zip"
unzip toflit18_bdd.zip -d "data"
rm -f toflit18_bdd.zip
mv "data/bdd courante.csv" "data/toflit18_all.csv"
echo "fetching latest toflit18 schema"
curl -o data/toflit18_sources_schema.json "https://raw.githubusercontent.com/medialab/toflit18_data/master/csv_sources_schema.json"
echo "fetching latest navigo pointcalls data"
curl -o data/navigo_all_pointcalls_1789.json "data.portic.fr/api/pointcalls/?date=1789"
echo "fetching latest navigo flows data"
curl -o data/navigo_all_flows_1789.json "data.portic.fr/api/flows/?date=1789"
echo "fetching latest navigo pointcalls schema"
curl -o data/portic_pointcalls_descriptions.json "http://data.portic.fr/api/fieldnames/?API=pointcalls"
echo "fetching latest navigo flows schema"
curl -o data/portic_flows_descriptions.json "http://data.portic.fr/api/fieldnames/?API=travels"
echo "building derivated datasets"
node prepareData
npm i