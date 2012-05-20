<?php
class User extends CI_Model{
	
	private $table_name = 'cidi_user';
	private $session_table = 'cidi_session';
	private $cookie_email = 'email';
	private $cookie_name = 'cidiu'; 
	
	function create($data){
		
		$data['password'] = md5($data['password']);
		
		
		$this->db->insert($this->table_name,$data);
	}
	
	function logged(){
		$this->load->database();
		$this->load->helper('cookie');
		$this->load->library('user_agent');
		
		$session = $this->input->cookie($this->cookie_name);
		$email = $this->input->cookie($this->cookie_email);
		
		$ua = $this->agent->browser().' '.$this->agent->version();
		$ip = $this->input->ip_address();
		$encrypt = $this->config->item('session_encrypt_code');
		$query = $this->db->select()->from($this->session_table)->where('email',$email)->get();
		
		if($row = $query->row()){
			
			$s = md5($email.$ua.$ip.$encrypt);
			
			if($s == $session){
				return true;
			}else{
				$this->db->where('email',$email);
				$this->db->delete($this->session_table);
				return false;
			}
			
		}else{
			delete_cookie($this->cookie_name);
			delete_cookie($this->cookie_email);
			return false;
			
		}
		
	}
	
	private function getGravatarByEmail($mail,$d="mm"){
		return "http://www.gravatar.com/avatar/".md5($mail)."?s=32&d=".$d;
	}
	
	
	function current(){
		$ua = $this->input->cookie($this->cookie_email);
		if(!$ua){
			return false;
		}else{
			$this->load->database();
			$query = $this->db->select()->from($this->table_name)->where('email',$ua)->get();
			$row = $query->row();
			$row -> avatar = $this->getGravatarByEmail($row->email);
			return $row;
		}
	}
	
	// return status
	// 0: failed
	// 1: succeeded
	// 2: info imcomplete
	function login($email,$password){
		$this->load->library('user_agent');
		$this->load->library('session');
		$this->load->database();
		
		$query = $this->db->select()->from($this->table_name)
			->where('email',$email)->get();
		
		$password = md5($password);
		
		$rows_count = $query->num_rows();
		$row = $query->row();
		
		
		if($rows_count == 0){
			// user not exists
			return -1;
		}
		
		//$password;
		
		
		if($row->password != $password){
			// password error
			return -2;
		}
		
		
		// or if user exists
		
		// write session and cookie 
		$ua = $this->agent->browser().' '.$this->agent->version();
		$ip =  $this->input->ip_address();
		$encrypt = $this->config->item('session_encrypt_code');
		$session = md5($email.$ua.$ip.$encrypt);
		
		$session_query = $this->db->select()->from($this->session_table)->where('session',$session)->get();
		
		// session不存在则存之
		if($session_query->num_rows == 0){
			
			$this->db->insert($this->session_table,array(
				'email' => $email,
				'session'=> $session,
				'ua' => $ua,
				'ip' => $ip
			));
			// save cookie of session to local
			$expire = time()+60*60*24*30;
			$this->input->set_cookie($this->cookie_name,$session,$expire);
			$this->input->set_cookie($this->cookie_email,$email,$expire);
		}
		
		// 返回成功
		return 1;
			
	}
	
	private function filterResult($result){
		$ret = array();
		
		foreach($result as $row){
			$ret[] = array(
				'id'=>$row->id,
				'username'=>$row->username,
				'avatar'=>$this->getGravatarByEmail($row->email)
			);
		}
		
		return $ret;
		
	}
	
	private function parseNum($from,$to){
		$num = $to-$from+1;
		
		if($num>10){$num = 10;}
		if($num<0){$num = 0;}
		
		return $num;
	}
	
	private function parseStart($from){
		$start = $from - 1;
		if($start<0){$start = 0;}
		return $start;	
	}
	
	
	function latest($from,$to){
		$this->load->database();
		$start = $this->parseStart($from);
		$num = $this->parseNum($from,$to);
			
		$query = $this->db->order_by('create_time','desc')->get($this->table_name,$num,$start);
		return $this->filterResult($query->result());
	}
	
	
	function search($keyword,$from,$to){
		$this->load->database();
		$like = $this->db->escape_like_str($keyword);
		
		$start = $this->parseStart($from);
		$num = $this->parseNum($from,$to);
			
		$query = $this->db->like('username',$like)->get($this->table_name,$num,$start);
		return $this->filterResult($query->result());
	}
	
	function name_exists($username){
		$query = $this->db
			->select('id')
			->from($this->table_name)
			->where('username',$username)
			->get();
		return $query->num_rows()>0;
	}

	
	function email_exists($email){
		$query = $this->db
			->select('id')
			->from($this->table_name)
			->where('email',$email)
			->get();
		return $query->num_rows()>0;
	}
}
