from dialog import SpeechCloudWS, Dialog
import logging
import json
import os
import string
import random
import urllib.request
import asyncio

class AdDialog(Dialog):

    async def main(self):
        # TODO vytvorit slozku data, pokud neni
        with open(f"data/last_id.json", "r") as f:
            last_id = json.load(f)
            await self.send_message({"message": "last_id", "data": last_id})
        
        await asyncio.sleep(1800)   

        # await self.check_microphone()
        # await self.patient_identification()
        # await self.repeat_numbers()
        # await self.lake_picture()
        # await self.animals_remembering()

    def on_receive_message(self, data):
        session = self.session_id
        msg = json.loads(data)
        topic = msg['topic']
        print('Webserver: Received WS message:', data)
        
        try:
            if(topic == "patientIdentification"):
                
                #session = self.session_id
                patientId = msg["patientId"]
                patientId = int(patientId)
                
                current_dir = os.getcwd()

                path_to_data = os.path.join(current_dir, "data")
                #session = self.id_generator()
                path_to_data_session = os.path.join(path_to_data, session)
                os.mkdir(path_to_data_session)

                path_to_data_session_records = os.path.join(path_to_data_session, "records")
                os.mkdir(path_to_data_session_records)

                with open(f"data/{session}/{session}.json", "a") as session_file:
                    json.dump(msg, session_file)

                with open(f"data/last_id.json", "w") as last_id_file:
                    dump_data = {"last_id": patientId}
                    json.dump(dump_data, last_id_file)
                
            
            elif(topic == 'animalsRemembering'):
                with open(f"data/{session}/animals.json", "w", encoding="utf-8") as animals_file:
                    json.dump(msg, animals_file)
            elif(topic =='ASR_audio'):
                url = msg["msg"]["uri"]
                record_id = msg["msg"]["id"]
                with open(f"data/{session}/records/{record_id}.json", "w") as record_file:
                    json.dump(msg, record_file)
                urllib.request.urlretrieve(url, f"data/{session}/records/{record_id}.wav")

        except (ValueError):
            print('Webserver: Received WS message:', data)
        except (KeyError):
            print('Webserver: Received WS message:', data)
if __name__ == '__main__':
    logging.basicConfig(format='%(asctime)s %(levelname)-10s %(message)s',level=logging.DEBUG)

    SpeechCloudWS.run(AdDialog, address="0.0.0.0", port=8888, static_path='./static')
