from app import app


##############################################################################
# episodes Page

@app.route('/episodes')
def episodes():
    """ get the first page of Locations"""

    try:
        response = requests.get(f'{base_api_url}/episode')
        response_text = json.loads(response.text)
        session['next_page'] = response_text['info']['next']
        print(response_text['info']['next'])
        return render_template('episodes.html', response= response_text)
    except:
        response_text = 'Something Went Wrong'
        flash('Something went wrong...')
        print(response_text)
        return redirect('/')

@app.route('/episodes/next')
def episodes_page_next():
    """ get the next page """
    try:
        response = requests.get(session["next_page"])
        response_text = json.loads(response.text)
        print(response_text)
        session['next_page'] = response_text['info']['next']
        session['back_page'] = response_text['info']['prev']
        return render_template('episodes.html', response= response_text)
    except:
        response_text = 'Something Went Wrong'
        flash('Something went wrong...')
        print(response_text)
        return redirect('/')


@app.route('/episodes/prev')
def episodes_page_prev():
    """ get the previous page """
    try:
        response = requests.get(session['back_page'])
        response_text = json.loads(response.text)
        session['next_page'] = response_text['info']['next']
        session['back_page'] = response_text['info']['prev']
        return render_template('episodes.html', response= response_text)
    except:
        response_text = 'Something Went Wrong'
        flash('Something went wrong...')
        print(response_text)
        return redirect('/')


