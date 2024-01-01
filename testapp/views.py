from flask import render_template, request, jsonify
from testapp import app
import json


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/receive_json', methods=['POST'])
def receive_json():
    try:
      received_data = request.json
      print(received_data)
      #print(received_data['prolific'])
      for received in received_data:
        print(received)
        prolific_id = received.get('ProlificID')
        print(prolific_id)
        
      if prolific_id is not None:
        file_path = 'testapp/result/'  + f'user_{prolific_id}_data.json'
        with open(file_path, 'w') as file:
          json.dump(received_data, file, ensure_ascii=False, indent=4, sort_keys=True, separators=(',', ': '))
          print({'message': f'Data for user {prolific_id} received and saved successfully'})
        #return jsonify({'message': f'Data for user {prolific_id} received and saved successfully'})
      else:
        print('error: Prolific ID not provided')
        #return jsonify({'error': 'Prolific ID not provided'})
      try:
         with open('all_data.json', 'r') as file:
            all_data = json.load(file)
      except FileNotFoundError:
            all_data = []

      # 新しいデータを追加
      all_data.append(received_data)

      # ファイルに書き込む
      with open('testapp/result/all_data.json', 'w') as file:
          json.dump(all_data, file, ensure_ascii=False, indent=2, sort_keys=True, separators=(',', ': '))
      print({'message': 'Data received and saved successfully'})
      return jsonify({'message': 'Data received and saved successfully'})  # 応答を返す

    except Exception as e:
        print('Error handling data:', str(e))
        return jsonify({'error': 'Error handling data'})