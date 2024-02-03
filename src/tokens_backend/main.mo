import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Debug "mo:base/Debug";
import Iter "mo:base/Iter";

actor Token {

    var owner : Principal = Principal.fromText("clb4t-mcpxh-cdiwb-rfyap-2zc76-liddi-iuha3-ltjdf-utrir-xn63t-sqe");
    var totalSupply : Nat = 1000000000; // Total initial supply is 1,000,000,000 tokens.
    var symbol : Text = "NXNO"; // The token symbol. name = NexaNova.

    private stable var balanceEntries: [(Principal, Nat)] = [];
    private var balances : HashMap.HashMap<Principal, Nat> = HashMap.HashMap<Principal, Nat>(1, Principal.equal, Principal.hash);
    if(balances.size() < 1){
        balances.put(owner, totalSupply);
    };

    public query func balanceOf(user: Principal) : async Nat {

        var balance : Nat = switch (balances.get(user)){
            case null 0;
            case (?value) value;
        };

        return balance;
    };

    public query func getSymbol() : async Text {
        return symbol;
    };

    public shared(msg) func payOut() : async Text {

        Debug.print(debug_show(msg.caller));

        if (balances.get(msg.caller) == null) {
            let amount = 1000;
            let result = await transfer(msg.caller, amount);
            return result;
        };

        return "Already Claimed.";
    };

    public shared(msg) func transfer(to: Principal, amount: Nat) : async Text {

        var fromBalance : Nat = await balanceOf(msg.caller);

        if (fromBalance < amount) {
            return "Insufficient balance.";
        };

        var toBalance : Nat = await balanceOf(to);

        balances.put(msg.caller, fromBalance - amount);
        balances.put(to, toBalance + amount);

        return "Success";
    };

    system func preupgrade() {
        balanceEntries := Iter.toArray(balances.entries());
    };

    system func postupgrade() {
        balances := HashMap.fromIter<Principal, Nat>(balanceEntries.vals(), 1, Principal.equal, Principal.hash);

        if(balances.size() < 1){
            balances.put(owner, totalSupply);
        }
    };

}